<template>
  <van-tabs v-model:active="active">
    <van-tab title="未支付" name="unpaid">
      <van-search v-model="unpaid.keywords" placeholder="请输入部门/购买方" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.UNPAID, unpaidForm, unpaid.keywords)" />
      <van-list v-model:loading="unpaid.loading" :finished="unpaid.finished" finished-text="没有更多了" @load="loadUnpaid">
        <van-cell v-for="item in unpaid.list" :key="item.id" :title="unpaidTitle(item)" is-link
          :url="`invoice/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="部分支付" name="part_paid">
      <van-search v-model="partPaid.keywords" placeholder="请输入部门/购买方" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.PART_PAID, partPaidForm, partPaid.keywords)" />
      <van-list v-model:loading="partPaid.loading" :finished="partPaid.finished" finished-text="没有更多了"
        @load="loadPartPaid">
        <van-cell v-for="item in partPaid.list" :key="item.id" :title="partPaidTitle(item)" is-link
          :url="`invoice/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已支付" name="paid">
      <van-search v-model="paid.keywords" placeholder="请输入部门/购买方" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.PAID, paidForm, paid.keywords)" />
      <van-list v-model:loading="paid.loading" :finished="paid.finished" finished-text="没有更多了" @load="loadPaid">
        <van-cell v-for="item in paid.list" :key="item.id" :title="paidTitle(item)" is-link
          :url="`invoice/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { PaymentState } from './invoice';

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  paymentState: number;
}

const TabTypes = {
  UNPAID: 'UNPAID' as const,
  PART_PAID: 'PART_PAID' as const,
  PAID: 'PAID' as const
}

const unpaid = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const unpaidForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  paymentState: PaymentState.UNPAID.code
})

const partPaid = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const partPaidForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  paymentState: PaymentState.PART_PAID.code
})

const paid = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const paidForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  paymentState: PaymentState.PAID.code
})

const active = ref('');

function setKeywordsAndSearch(type: keyof typeof TabTypes, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (type == TabTypes.UNPAID) {
    searchUnpaid(true)
  } else if (type == TabTypes.PART_PAID) {
    searchPartPaid(true)
  } else if (type == TabTypes.PAID) {
    searchPaid(true)
  }
}

function searchUnpaid(reset: boolean) {
  unpaid.loading = true
  const param = { ...unpaidForm }
  Api.req('/invoice/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      unpaid.finished = true
    }
    unpaidForm.page = unpaidForm.page + 1
    if (!reset) {
      data.forEach(e => unpaid.list.push(e))
    }
    else {
      unpaid.list = data
    }
  }).finally(() => unpaid.loading = false).get()
}


function searchPartPaid(reset: boolean) {
  partPaid.loading = true
  const param = { ...partPaidForm }
  Api.req('/invoice/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      partPaid.finished = true
    }
    partPaidForm.page = partPaidForm.page + 1
    if (!reset) {
      data.forEach(e => partPaid.list.push(e))
    }
    else {
      partPaid.list = data
    }
  }).finally(() => partPaid.loading = false).get()
}

function searchPaid(reset: boolean) {
  paid.loading = true
  const param = { ...paidForm }
  Api.req('/invoice/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      paid.finished = true
    }
    paidForm.page = paidForm.page + 1
    if (!reset) {
      data.forEach(e => paid.list.push(e))
    }
    else {
      paid.list = data
    }
  }).finally(() => paid.loading = false).get()
}

function unpaidTitle(item: any) {
  return `【${item.deptName}】${item.buyerName}待收款${item.amountTaxTotal}元`
}

function partPaidTitle(item: any) {
  return `【${item.deptName}】${item.buyerName}已收款【${item.received}/${item.amountTaxTotal}】元`
}

function paidTitle(item: any) {
  return `【${item.deptName}】${item.buyerName}已收款【${item.received}/${item.amountTaxTotal}】元`
}


function loadUnpaid() {
  searchUnpaid(false)
}

function loadPartPaid() {
  searchPartPaid(false)
}

function loadPaid() {
  searchPaid(false)
}

</script>

<route lang="json5">
{
  name: 'InvoiceManagement'
}
</route>
