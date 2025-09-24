import { Api } from "@/utils/request"

export interface LoginForm {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserState {
  uid?: number
  name?: string
  avatar?: string
}

export interface AccessUser {
  userId: string;
  userName: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
}

export function doLogin(form: LoginForm): Promise<AccessUser> {
  const { promise, resolve, reject } = Promise.withResolvers<AccessUser>()
  Api.req('/login').json(form).public().success(async (data: AccessUser) => {
    resolve(data)
  }).fail(error => reject(error))
    .post();
  return promise;
}

export function getUserInfo() {
  return Promise.resolve();
}
