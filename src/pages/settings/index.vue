<script setup lang="ts">
import { showConfirmDialog } from 'vant'
import router from '@/router'
import { logout } from '@/utils/auth'

const { t } = useI18n()

function logoutSystem() {
  showConfirmDialog({
    title: t('settings.confirmTitle'),
  }).then(() => {
    logout()
    router.push({ name: 'Login' })
  })
}
</script>

<template>
  <div class="text-center">
    <VanCellGroup :inset="true">
      <van-cell :title="$t('settings.logout')" clickable class="van-text-color" @click="logoutSystem" />
    </VanCellGroup>

    <div class="text-gray mt-10">
      {{ $t("settings.currentVersion") }}: v1.0.0
    </div>
  </div>
</template>

<style scoped>
.van-text-color {
  --van-cell-text-color: var(--van-red);
}
</style>

<route lang="json5">
{
  name: 'Settings'
}
</route>
