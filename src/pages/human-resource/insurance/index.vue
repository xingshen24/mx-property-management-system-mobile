<template>
  <van-tabs v-model:active="active">
    <van-tab title="未参保" name="notInsured">
      <van-search v-model="notInsured.keywords" placeholder="请输入员工/部门" input-align="center"
        @search="setKeywordsAndSearch(true, notInsuredForm, notInsured.keywords)" />
      <van-list v-model:loading="notInsured.loading" :finished="notInsured.finished" finished-text="没有更多了"
        @load="loadNotInsured">
        <van-cell v-for="item in notInsured.list" :key="item.id" :title="notInsuredTitle(item)" is-link
          :url="`insurance/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已参保" name="insured">
      <van-search v-model="insured.keywords" placeholder="请输入员工/部门" input-align="center"
        @search="setKeywordsAndSearch(false, insuredForm, insured.keywords)" />
      <van-list v-model:loading="insured.loading" :finished="insured.finished" finished-text="没有更多了"
        @load="loadInsured">
        <van-cell v-for="item in insured.list" :key="item.id" :title="insuredTitle(item)" is-link
          :url="`insurance/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { GetInsuranceTypeName, InsuranceState } from '../employee/employee';

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  insuranceState: number;
}

const notInsured = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const notInsuredForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  insuranceState: InsuranceState.NOT_INSURED.code
})

const insured = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const insuredForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  insuranceState: InsuranceState.INSURED.code
})

const active = ref('');

function setKeywordsAndSearch(insured: boolean, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (insured) {
    searchNotInsured(true)
  } else {
    searchInsured(true)
  }
}

function searchNotInsured(reset: boolean) {
  notInsured.loading = true
  const param = { ...notInsuredForm }
  Api.req('/employee/query-insurance').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      notInsured.finished = true
    }
    notInsuredForm.page = notInsuredForm.page + 1
    if (!reset) {
      data.forEach(e => notInsured.list.push(e))
    }
    else {
      notInsured.list = data
    }
  }).finally(() => notInsured.loading = false).get()
}

function searchInsured(reset: boolean) {
  insured.loading = true
  const param = { ...insuredForm }
  Api.req('/employee/query-insurance').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      insured.finished = true
    }
    insuredForm.page = insuredForm.page + 1
    if (!reset) {
      data.forEach(e => insured.list.push(e))
    }
    else {
      insured.list = data
    }
  }).finally(() => insured.loading = false).get()
}

function notInsuredTitle(item: any) {
  return `【${item.deptName}】${item.empName}`
}

function insuredTitle(item: any) {
  return `【${GetInsuranceTypeName(item.insuranceType)}】【${item.deptName}】${item.empName}`
}

function loadNotInsured() {
  searchNotInsured(false)
}

function loadInsured() {
  searchInsured(false)
}
</script>

<route lang="json5">
{
  name: 'Insurance'
}
</route>
