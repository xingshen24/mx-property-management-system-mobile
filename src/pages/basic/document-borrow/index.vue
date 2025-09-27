<template>
  <van-tabs v-model:active="active">
    <van-tab title="我的出借" name="lend">
      <van-search v-model="lend.keywords" placeholder="请输入搜索关键词" input-align="center"
        @search="setKeywordsAndSearch(true, lendForm, lend.keywords)" />
      <van-list v-model:loading="lend.loading" :finished="lend.finished" finished-text="没有更多了" @load="loadLend">
        <van-cell v-for="item in lend.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`document-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="我的借阅" name="borrow">
      <van-search v-model="borrow.keywords" placeholder="请输入搜索关键词" input-align="center"
        @search="setKeywordsAndSearch(false, borrowForm, borrow.keywords)" />
      <van-list v-model:loading="borrow.loading" :finished="borrow.finished" finished-text="没有更多了" @load="loadBorrow">
        <van-cell v-for="item in borrow.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`document-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-floating-bubble axis="lock" icon="plus" @click="newDocumentBorrow" />
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { GetBorrowDocumentTypeName } from './borrow';

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
}

const lend = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const lendForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
})

const borrow = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const borrowForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
})

const active = ref('');

function setKeywordsAndSearch(lend: boolean, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (lend) {
    searchLend(true)
  } else {
    searchBorrow(true)
  }
}

function searchLend(reset: boolean) {
  lend.loading = true
  const param = { ...lendForm }
  Api.req('/document-borrow/query-my-lend').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      lend.finished = true
    }
    lendForm.page = lendForm.page + 1
    if (!reset) {
      data.forEach(e => lend.list.push(e))
    }
    else {
      lend.list = data
    }
  }).finally(() => lend.loading = false).get()
}

function searchBorrow(reset: boolean) {
  borrow.loading = true
  const param = { ...borrowForm }
  Api.req('/document-borrow/query-my-borrow').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      borrow.finished = true
    }
    borrowForm.page = borrowForm.page + 1
    if (!reset) {
      data.forEach(e => borrow.list.push(e))
    }
    else {
      borrow.list = data
    }
  }).finally(() => borrow.loading = false).get()
}

function documentTitle(item: any) {
  return `【${GetBorrowDocumentTypeName(item.borrowType)}】${item.documentName}`
}

function loadLend() {
  searchLend(false)
}

function loadBorrow() {
  searchBorrow(false)
}

const router = useRouter();
const newDocumentBorrow = () => {
  router.push('/basic/document-borrow/form');
}

</script>

<route lang="json5">
{
  name: 'MyDocumentBorrow'
}
</route>
