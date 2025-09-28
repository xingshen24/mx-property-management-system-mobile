<template>
  <van-tabs v-model:active="active">
    <van-tab title="审批中" name="handling">
      <van-search v-model="handling.keywords" placeholder="请输入职位名称/园区/岗位要求" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.HANDLING, handlingForm, handling.keywords)" />
      <van-list v-model:loading="handling.loading" :finished="handling.finished" finished-text="没有更多了"
        @load="loadHandling">
        <van-cell v-for="item in handling.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="待处理" name="approved">
      <van-search v-model="approved.keywords" placeholder="请输入职位名称/园区/岗位要求" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.APPROVED, approvedForm, approved.keywords)" />
      <van-list v-model:loading="approved.loading" :finished="approved.finished" finished-text="没有更多了"
        @load="loadApproved">
        <van-cell v-for="item in approved.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已处理" name="handled">
      <van-search v-model="handled.keywords" placeholder="请输入职位名称/园区/岗位要求" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.HANDLED, handledForm, handled.keywords)" />
      <van-list v-model:loading="handled.loading" :finished="handled.finished" finished-text="没有更多了"
        @load="loadHandled">
        <van-cell v-for="item in handled.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { IntentionHandleState } from '@/utils/approvalState';
import { Api } from '@/utils/request'

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  intentionState: number;
}

const TabTypes = {
  HANDLING: 'HANDLING' as const,
  APPROVED: 'APPROVED' as const,
  HANDLED: 'HANDLED' as const
}

const handling = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const handlingForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  intentionState: IntentionHandleState.HANDLING.code
})

const approved = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const approvedForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  intentionState: IntentionHandleState.APPROVED.code
})

const handled = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const handledForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  intentionState: IntentionHandleState.HANDLED.code
})

const active = ref('');

function setKeywordsAndSearch(type: keyof typeof TabTypes, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (type === TabTypes.HANDLING) {
    searchHandling(true)
  } else if (type === TabTypes.APPROVED) {
    searchApproved(true)
  } else if (type === TabTypes.HANDLED) {
    searchHandled(true)
  } else throw new Error(`未知的Tab类型${type}`)
}

function searchHandling(reset: boolean) {
  handling.loading = true
  const param = { ...handlingForm }
  Api.req('/recruitment-intention/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      handling.finished = true
    }
    handlingForm.page = handlingForm.page + 1
    if (!reset) {
      data.forEach(e => handling.list.push(e))
    }
    else {
      handling.list = data
    }
  }).finally(() => handling.loading = false).get()
}

function searchApproved(reset: boolean) {
  approved.loading = true
  const param = { ...approvedForm }
  Api.req('/recruitment-intention/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      approved.finished = true
    }
    approvedForm.page = approvedForm.page + 1
    if (!reset) {
      data.forEach(e => approved.list.push(e))
    }
    else {
      approved.list = data
    }
  }).finally(() => approved.loading = false).get()
}

function searchHandled(reset: boolean) {
  handled.loading = true
  const param = { ...handledForm }
  Api.req('/recruitment-intention/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      handled.finished = true
    }
    handledForm.page = handledForm.page + 1
    if (!reset) {
      data.forEach(e => handled.list.push(e))
    }
    else {
      handled.list = data
    }
  }).finally(() => handled.loading = false).get()
}


function documentTitle(item: any) {
  return `${item.parkName}申请招聘${item.jobDictName}${item.recruitingNumber}人`
}

function loadHandling() {
  searchHandling(false)
}

function loadApproved() {
  searchApproved(false)
}

function loadHandled() {
  searchHandled(false);
}

</script>

<route lang="json5">
{
  name: 'MyDocumentBorrow'
}
</route>
