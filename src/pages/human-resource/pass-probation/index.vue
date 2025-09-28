<template>
  <van-tabs v-model:active="active">
    <van-tab title="试用中" name="probation">
      <van-search v-model="probation.keywords" placeholder="请输入员工/岗位/部门搜索" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.PROBATION, probationForm, probation.keywords)" />
      <van-list v-model:loading="probation.loading" :finished="probation.finished" finished-text="没有更多了"
        @load="loadProbation">
        <van-cell v-for="item in probation.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="转正审批中" name="probationApproval">
      <van-search v-model="probationApproval.keywords" placeholder="请输入员工/岗位/部门搜索" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.PROBATION_APPROVAL, probationApprovalForm, probationApproval.keywords)" />
      <van-list v-model:loading="probationApproval.loading" :finished="probationApproval.finished" finished-text="没有更多了"
        @load="loadProbationApproval">
        <van-cell v-for="item in probationApproval.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已转正" name="passProbation">
      <van-search v-model="passProbation.keywords" placeholder="请输入员工/岗位/部门搜索" input-align="center"
        @search="setKeywordsAndSearch(TabTypes.PASS_PROBATION, passProbationForm, passProbation.keywords)" />
      <van-list v-model:loading="passProbation.loading" :finished="passProbation.finished" finished-text="没有更多了"
        @load="loadPassProbation">
        <van-cell v-for="item in passProbation.list" :key="item.id" :title="documentTitle(item)" is-link
          :url="`recruitment-intention/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { EntryJobStatus } from '../job-entry/jobEntry';

interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  entryJobStatus: number;
}

const TabTypes = {
  PROBATION: 'PROBATION' as const,
  PROBATION_APPROVAL: 'PROBATION_APPROVAL' as const,
  PASS_PROBATION: 'PASS_PROBATION' as const
}

const probation = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const probationForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  entryJobStatus: EntryJobStatus.PROBATION.code
})

const probationApproval = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const probationApprovalForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  entryJobStatus: EntryJobStatus.PROBATION_APPROVAL.code
})

const passProbation = reactive({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const passProbationForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  entryJobStatus: EntryJobStatus.PASS_PROBATION.code
})

const active = ref('');

function setKeywordsAndSearch(type: keyof typeof TabTypes, form: SearchForm, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords
  if (type === TabTypes.PROBATION) {
    searchProbation(true)
  } else if (type === TabTypes.PROBATION_APPROVAL) {
    searchProbationApproval(true)
  } else if (type === TabTypes.PASS_PROBATION) {
    searchPassProbation(true)
  } else throw new Error(`未知的Tab类型${type}`)
}

function searchProbation(reset: boolean) {
  probation.loading = true
  const param = { ...probationForm }
  Api.req('/passed-candidate/query-probation').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      probation.finished = true
    }
    probationForm.page = probationForm.page + 1
    if (!reset) {
      data.forEach(e => probation.list.push(e))
    }
    else {
      probation.list = data
    }
  }).finally(() => probation.loading = false).get()
}

function searchProbationApproval(reset: boolean) {
  probationApproval.loading = true
  const param = { ...probationApprovalForm }
  Api.req('/passed-candidate/query-probation').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      probationApproval.finished = true
    }
    probationApprovalForm.page = probationApprovalForm.page + 1
    if (!reset) {
      data.forEach(e => probationApproval.list.push(e))
    }
    else {
      probationApproval.list = data
    }
  }).finally(() => probationApproval.loading = false).get()
}

function searchPassProbation(reset: boolean) {
  passProbation.loading = true
  const param = { ...passProbationForm }
  Api.req('/passed-candidate/query-probation').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      passProbation.finished = true
    }
    passProbationForm.page = passProbationForm.page + 1
    if (!reset) {
      data.forEach(e => passProbation.list.push(e))
    }
    else {
      passProbation.list = data
    }
  }).finally(() => passProbation.loading = false).get()
}


function documentTitle(item: any) {
  return `【${item.deptName} - ${item.jobDictName}】${item.name}`
}

function loadProbation() {
  searchProbation(false)
}

function loadProbationApproval() {
  searchProbationApproval(false)
}

function loadPassProbation() {
  searchPassProbation(false);
}

</script>

<route lang="json5">
{
  name: 'PassedCandidatePassProbation'
}
</route>
