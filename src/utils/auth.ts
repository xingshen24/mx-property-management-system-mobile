import { ACCESS_TOKEN, Local, REFRESH_TOKEN, Session } from './storage'

function setToken(refreshToken: string, accessToken: string) {
  Local.set(REFRESH_TOKEN, refreshToken);
  Local.set(ACCESS_TOKEN, accessToken);
}

function clearToken() {
  Local.remove(REFRESH_TOKEN)
  Local.remove(ACCESS_TOKEN)
}

export function logout() {
  // 清除缓存/token等
  Session.clear();
  Local.remove(REFRESH_TOKEN);
  Local.remove(ACCESS_TOKEN);
  // 使用 reload 时，不需要调用 resetRoute() 重置路由
}

export { setToken, clearToken }
