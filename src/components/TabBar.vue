<template>
  <van-tabbar v-if="show" v-model="active" route placeholder>
    <van-tabbar-item replace to="/home">
      {{ $t('tabbar.home') }}
      <template #icon>
        <van-icon class-prefix="iconfont-icon" name="message" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/workbench">
      {{ `工作台` }}
      <template #icon>
        <van-icon class-prefix="iconfont-icon" name="workbench" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/profile">
      {{ $t('tabbar.profile') }}
      <template #icon>
        <van-icon class-prefix="iconfont-icon" name="user" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { LOGIN_ROUTE, rootRouteList } from '@/config/routes'

const active = ref(0)
const route = useRoute()

const show = computed(() => {
  if (route.name && rootRouteList.includes(route.name) && route.name != LOGIN_ROUTE) {
    return true
  }
  return false
})
</script>
<style>
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'iconfont';
  src: url('/iconfont.ttf?t=1758379139465') format('truetype');
}

.iconfont-icon {
  font-family: 'iconfont';
  font-style: normal;
}

.iconfont-icon-message::before {
  content: '\e648';
}

.iconfont-icon-workbench::before {
  content: '\e68c';
}

.iconfont-icon-user::before {
  content: '\e63c';
}
</style>