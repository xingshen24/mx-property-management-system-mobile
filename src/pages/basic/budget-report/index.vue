<template>
  <van-tabs v-model:active="active">
    <van-tab title="我的收到" name="receive">
      <van-search v-model="receive.keywords" placeholder="请输入搜索关键词" input-align="center"
        @search="setKeywordsAndSearch(true, receiveForm, receive.keywords)" />
      <van-list v-model:loading="receive.loading" :finished="receive.finished" finished-text="没有更多了"
        @load="loadReceive">
        <van-cell v-for="item in receive.list" :key="item.id" :title="item.title" is-link
          :url="`budget-report/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="我的上报" name="promote">
      <van-search v-model="promote.keywords" placeholder="请输入搜索关键词" input-align="center"
        @search="setKeywordsAndSearch(false, promoteForm, promote.keywords)" />
      <van-list v-model:loading="promote.loading" :finished="promote.finished" finished-text="没有更多了"
        @load="loadPromote">
        <van-cell v-for="item in promote.list" :key="item.id" :title="item.title" is-link
          :url="`budget-report/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-floating-bubble axis="lock" icon="plus" @click="newBudgetReport" />
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
}

const receive = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const receiveForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
})

const promote = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const promoteForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
})

const active = ref('');

function setKeywordsAndSearch(receive: boolean, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (receive) {
    searchReceive(true)
  } else {
    searchPromote(true)
  }
}

function searchReceive(reset: boolean) {
  receive.loading = true
  const param = { ...receiveForm }
  Api.req('/budget-report/query-receive').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      receive.finished = true
    }
    receiveForm.page = receiveForm.page + 1
    if (!reset) {
      data.forEach(e => receive.list.push(e))
    }
    else {
      receive.list = data
    }
  }).finally(() => receive.loading = false).get()
}

function searchPromote(reset: boolean) {
  promote.loading = true
  const param = { ...promoteForm }
  Api.req('/budget-report/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      promote.finished = true
    }
    promoteForm.page = promoteForm.page + 1
    if (!reset) {
      data.forEach(e => promote.list.push(e))
    }
    else {
      promote.list = data
    }
  }).finally(() => promote.loading = false).get()
}

function loadReceive() {
  searchReceive(false)
}

function loadPromote() {
  searchPromote(false)
}

const router = useRouter();
const newBudgetReport = () => {
  router.push('/basic/budget-report/form');
}
</script>

<route lang="json5">
{
  name: 'MyBudgetReport'
}
</route>
