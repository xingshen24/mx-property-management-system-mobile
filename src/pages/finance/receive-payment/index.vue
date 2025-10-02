<template>
  <van-tabs v-model:active="active">
    <van-tab title="审批中" name="handling">
      <van-search v-model="handling.keywords" placeholder="请输入员工/部门" input-align="center"
        @search="setKeywordsAndSearch(true, handlingForm, handling.keywords)" />
      <van-list v-model:loading="handling.loading" :finished="handling.finished" finished-text="没有更多了"
        @load="loadHandling">
        <van-cell v-for="item in handling.list" :key="item.id" :title="approvedTitle(item)" is-link
          :url="`receive-payment/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已通过" name="insured">
      <van-search v-model="approved.keywords" placeholder="请输入员工/部门" input-align="center"
        @search="setKeywordsAndSearch(false, approvedForm, approved.keywords)" />
      <van-list v-model:loading="approved.loading" :finished="approved.finished" finished-text="没有更多了"
        @load="loadApproved">
        <van-cell v-for="item in approved.list" :key="item.id" :title="approvedTitle(item)" is-link
          :url="`receive-payment/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { GeneralWithFinanceReviewApprovalState } from '../common/finance';

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  approvalStates: number[];
}

const handling = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const STATE = GeneralWithFinanceReviewApprovalState;

const handlingForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  approvalStates: [
    STATE.DEPT_HEAD_PROCESSING.code,
    STATE.DEPT_LEADER_PROCESSING.code,
    STATE.FINANCE_REVIEWING.code,
    STATE.GM_PROCESSING.code
  ]
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
  approvalStates: [STATE.APPROVE.code]
})

const active = ref('');

function setKeywordsAndSearch(insured: boolean, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (insured) {
    searchHandling(true)
  } else {
    searchApproved(true)
  }
}

function searchHandling(reset: boolean) {
  handling.loading = true
  const param = { ...handlingForm }
  Api.req('/receive-payment/query').query(param).success((data: any[]) => {
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
  Api.req('/receive-payment/query').query(param).success((data: any[]) => {
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

function approvedTitle(item: any) {
  return `【${item.deptName}】${item.empName}领款${item.amount}元`
}

function loadHandling() {
  searchHandling(false)
}

function loadApproved() {
  searchApproved(false)
}

</script>

<route lang="json5">
{
  name: 'ReceivePayment'
}
</route>
