import axios, { type AxiosInstance, type AxiosProgressEvent, type AxiosRequestConfig, type AxiosResponse, type ResponseType } from 'axios';
import qs from 'qs';
import { logout } from './auth';
import { ACCESS_TOKEN, Local, REFRESH_TOKEN } from './storage';
import { ResultCodes } from './resultCodes'
import { showFailToast, showSuccessToast } from 'vant';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: {
    serialize(params) {
      return qs.stringify(params, { allowDots: true, arrayFormat: 'repeat' });
    },
  },
});


// 添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    delete config.headers.Cookies
    return config;
  },
  error => Promise.reject(error)
)

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";

export const AUTHORIZATION = "Authorization";

export interface Result<T> {
  code: number;
  data: T | null;
  info: string | undefined;
  error: string | undefined;
  warn: string | undefined;
}

/**
 * refreshToken操作应该不能够并发进行
 * 如果refreshToken正在进行中，那么发起请求需要等待refreshToken
 * 
 * 如果刷新refreshToken成功了，那么继续所有请求
 * 如果刷新refreshToken失败了，则不进行任何请求·	
 */
let refreshTokenPromise = Promise.resolve(true);

export interface AccessUser {
  userId: string;
  userName: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

function NOP() { }

export interface UserToken {
  refreshToken: string;
  accessToken: string;
}

export class Api {

  private _url = "";

  private method = "get";

  private _headers: Record<string, string> = {};

  private data = "";

  private queryParams: any = null;

  private isAuthorized = true;

  private _silent = false;

  private _successTooltip: string | null = null;

  private _setSuccessTooltip = false;

  private successCallback: ((data: any) => void) | null = null;

  private resultCallback: ((data: AxiosResponse<any, any>) => void) | null = null;

  private failCallback: ((data: Result<any>) => void) | null = null;

  private finallyFn: (() => void) = NOP;

  private _uploadFile = false;

  private _formData: FormData | null = null;

  private _uploadProgress: ((e: AxiosProgressEvent) => void) | null = null;

  private _responseType: ResponseType | null = null;

  constructor(requestUrl: string) {
    this._url = requestUrl;
    this._headers['Content-Type'] = JSON_CONTENT_TYPE;
    if (Local.get(ACCESS_TOKEN)) {
      this._headers[AUTHORIZATION] = `${Local.get(ACCESS_TOKEN)}`;
    }
  }

  query(params: any) {
    this.queryParams = params;
    return this;
  }

  json(param: any) {
    this._headers['Content-Type'] = JSON_CONTENT_TYPE;
    this.data = JSON.stringify(param);
    return this;
  }

  /** 无需授权的API */
  public() {
    this.isAuthorized = false;
    return this;
  }

  /** 对API进行授权 */
  authorized() {
    this.isAuthorized = true;
    return this;
  }

  header(key: string, value: string) {
    this._headers[key] = value;
    return this;
  }

  responseType(type: ResponseType) {
    this._responseType = type;
    return this
  }

  files(filesForm: FormData, callback?: ((e: AxiosProgressEvent) => void)) {
    this._formData = filesForm;
    delete this._headers['Content-Type'];
    this._uploadFile = true;
    if (callback) {
      this._uploadProgress = callback;
    }
    return this;
  }

  /** 对于错误静默处理， */
  silent() {
    this._silent = true;
    return this;
  }

  success<T>(callback: (data: T) => void) {
    this.successCallback = callback;
    return this;
  }

  successTooltip(tooltip?: string) {
    this._setSuccessTooltip = true;
    if (tooltip !== null && tooltip !== undefined) {
      this._successTooltip = tooltip;
    }
    return this;
  }

  finally(fn: () => void) {
    this.finallyFn = fn;
    return this;
  }

  /**
   * 自定义一个回调结果，请求结束后执行回调。
   * 自定义回调之后，不再执行原来的回调以及其它success和fail方法。
   * @param callback 请求结束后的回调
   */
  result(callback: (result: AxiosResponse<any, any>) => void) {
    this.resultCallback = callback;
    return this;
  }

  /**
   * 
   * @param callback 失败时候的回调
   * @returns 
   */
  fail<T>(callback: (result: Result<T>) => void) {
    this.failCallback = callback;
    return this;
  }

  post() {
    this.method = 'post';
    this.execute();
  }

  get() {
    this.method = 'get';
    this.execute();
  }

  private execute() {
    if (this.isAuthorized) {
      this.doAuthorizedExecute();
    } else {
      this.publicExecute();
    }
  }

  private async doAuthorizedExecute() {
    // Token不需要重试，拿不到Token说明服务器出问题了
    refreshTokenPromise.then(ok => {
      // 如果没有拿到有效的Token，则停止请求
      if (!ok) return
      this._headers[AUTHORIZATION] = Local.get(ACCESS_TOKEN);
      this.request().then(result => {
        const contentType = result.headers['content-type'] ?? '';
        if (contentType.indexOf('application/json') >= 0) {
          const data = <Result<any>>result.data;
          // 对于要进行授权的操作，需要检查Token信息
          if (this.isAccessTokenInvalid(data)) {
            // TODO 还是要考虑一下，如果两个请求都在refresh怎么办？
            this.refreshTokenAndRetry();
            return;
          }
          // 如果自定义了处理方法，直接使用默认处理方法，忽略其它的方法
          if (this.resultCallback) {
            this.resultCallback(result);
            return;
          }
          // 成功直接执行成功的请求
          if (data.code === 0) {
            if (!this._silent && this._setSuccessTooltip) {
              const msg = this._successTooltip ?? data.info;
              showSuccessToast(msg);
            }
            this.successCallback?.(data.data);
            return;
          }

          // TODO fail流程要强化好
          if (this.failCallback) {
            this.failCallback(data);
          }
          if (!this._silent) {
            this.showFailText(data);
          }
        } else {
          // 如果自定义了处理方法，直接使用默认处理方法，忽略其它的方法
          if (this.resultCallback) {
            this.resultCallback(result);
            return;
          }
        }
      }, this.handleUnexceptRepsone.bind(this))
        .catch(this.handleUnexceptRepsone.bind(this))
        .finally(this.finallyFn);
    })
  }
  showFailText(data: Result<any>) {
    if (data.error) {
      showFailToast(data.error);
    } else if (data.warn) {
      showFailToast(data.warn);
    }
  }

  private publicExecute() {
    this.request().then(result => {
      const data = <Result<any>>result.data;
      // 如果自定义了处理方法，直接使用默认处理方法，忽略其它的方法
      if (this.resultCallback) {
        this.resultCallback(<any>data);
        return;
      }
      // 成功直接执行成功的请求
      if (data.code === 0) {
        if (!this._silent && this._setSuccessTooltip) {
          const msg = this._successTooltip ?? data.info;
          showSuccessToast(msg);
        }
        this.successCallback?.(data.data);
        return;
      }
      if (this.failCallback) {
        this.failCallback(data);
      }
      if (this._silent) {
        console.log(data);
      } else {
        showFailToast(data.error);
      }
    }, this.handleUnexceptRepsone.bind(this)).catch(error => {
      console.error('处理请求过程中出现了不符合预期的错误', error)
    }).finally(this.finallyFn)
  }

  private handleUnexceptRepsone(error: any) {
    if (this._silent) {
      return;
    }
    let message = '';
    // 这是一个BUG，非服务器的异常不应该捕获
    if (error && error?.message) {
      message = '，错误信息 ' + error.message
    }
    console.error(error);
    showFailToast('请求服务器时出现异常' + message);
  }

  private request() {
    if (this._uploadFile) {
      return this.uploadFile();
    } else {
      return this.requestNormal();
    }
  }

  private requestNormal() {
    const args: AxiosRequestConfig<any> = {
      url: this._url,
      method: this.method,
      data: this.data,
      headers: this._headers,
    }
    if (this._responseType) {
      args.responseType = this._responseType;
    }
    if (this.queryParams) {
      args.params = this.queryParams;
    }
    return axiosInstance.request(args)
  }

  private uploadFile() {
    if (this.method != 'post') {
      throw new Error('上传文件只支持post请求');
    }
    this._headers['Content-Type'] = 'multipart/form-data'
    const config: AxiosRequestConfig = {
      headers: this._headers
    };
    if (this._uploadProgress) {
      config.onUploadProgress = this._uploadProgress!;
    }
    return axiosInstance.post(this._url, this._formData, config)
  }

  isAccessTokenInvalid(data: Result<any>) {
    return data.code === ResultCodes.ACCESS_TOKEN_INVALID;
  }

  refreshTokenAndRetry() {
    this._headers = {
      AUTHORIZATION: Local.get(REFRESH_TOKEN)
    }
    refreshTokenPromise = axiosInstance.request({
      url: '/refresh-token',
      method: 'post',
      headers: this._headers,
    }).then(res => {
      const data = <Result<UserToken>>res.data;
      if (data.code === 0) {
        const token = data.data!;
        if (token == null || token.refreshToken == null || token.accessToken == null) {
          showFailToast('权限系统异常！未能正确获取到登录凭证信息，请联系管理员！')
          return false
        }
        Local.set(ACCESS_TOKEN, token.accessToken);
        Local.set(REFRESH_TOKEN, token.refreshToken);
        this.doAuthorizedExecute();
        return true;
        // 再次执行
      } else {
        logout();
        return false;
      }
    }, () => {
      showFailToast('网络异常，请确认网络正常后刷新页面！')
      logout();
      return false;
    }).catch(() => {
      logout();
      return false;
    })
  }

  static req(url: string) {
    return new Api(url);
  }
}


// 导出 axios 实例
export default axiosInstance;
