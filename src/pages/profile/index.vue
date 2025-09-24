<template>
  <div class="app-wrapper">
    <VanCellGroup :inset="true">
      <van-cell center :is-link="false">
        <template #title>
          <van-image :src="userInfo.avatar || defaultAvatar" round class="h-56 w-56" />
        </template>

        <template #value>
          <span>{{ userInfo.name }}</span>
        </template>
      </van-cell>
    </VanCellGroup>

    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell :title="$t('profile.settings')" icon="setting-o" is-link to="/settings">
        <template #icon>
          <div class="i-carbon:settings text-gray-400 mr-5 self-center" />
        </template>
      </van-cell>
      <van-cell :title="$t('profile.docs')" is-link url="https://vue-zone.github.io/docs/vue3-vant-mobile/">
        <template #icon>
          <div class="i-carbon:doc text-gray-400 mr-5 self-center" />
        </template>
      </van-cell>
    </VanCellGroup>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>

<route lang="json5">
{
  name: 'Profile'
}
</route>
<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
