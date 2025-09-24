
/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 查看 v2.4.3版本更新日志`
	setKey(key: string) {
		// @ts-ignore
		return `mx-property-management-system-mobile:${key}`;
	},
	// 设置永久缓存
	set<T>(key: string, val: T) {
		localStorage.setItem(Local.setKey(key), JSON.stringify(val));
	},

	// 获取永久缓存
	get(key: string) {
		let json = <string>localStorage.getItem(Local.setKey(key));
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key: string) {
		localStorage.removeItem(Local.setKey(key));
	},
	// 移除全部永久缓存
	clear() {
		localStorage.clear();
	},
};

export const ACCESS_TOKEN = "accessToken";

export const REFRESH_TOKEN = "refreshToken";

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set<T>(key: string, val: T) {
		sessionStorage.setItem(Local.setKey(key), JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		let json = <string>sessionStorage.getItem(Local.setKey(key));
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {
		sessionStorage.removeItem(Local.setKey(key));
	},
	// 移除全部临时缓存
	clear() {
		sessionStorage.clear();
	},
};
