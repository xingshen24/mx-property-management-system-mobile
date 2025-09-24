<script setup lang="ts">

import logo from '~/images/logo.svg'
import logoDark from '~/images/logo-dark.svg'
import { login } from '@/stores/modules/user'

const loading = ref(false)

const dark = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    dark.value = newMode
  },
)

const form = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
})

const router = useRouter()

async function loginSystem(values: any) {
  try {
    loading.value = true
    await login({ ...form, ...values })
    router.push('/')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="m-x-a text-center w-7xl">
    <div class="mb-32 mt-20">
      <van-image :src="dark ? logoDark : logo" class="h-120 w-120" alt="brand logo" />
    </div>

    <van-form :model="form" :rules="rules" validate-trigger="onSubmit" @submit="loginSystem">
      <div class="rounded-3xl overflow-hidden">
        <van-field v-model="form.username" :rules="rules.username" name="email" :placeholder="$t('login.email')" />
      </div>

      <div class="mt-16 rounded-3xl overflow-hidden">
        <van-field v-model="form.password" type="password" :rules="rules.password" name="password"
          :placeholder="$t('login.password')" />
      </div>

      <div class="mt-16">
        <van-button :loading="loading" type="primary" native-type="submit" round block>
          {{ $t('login.login') }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<route lang="json5">
{
  name: 'Login'
}
</route>
