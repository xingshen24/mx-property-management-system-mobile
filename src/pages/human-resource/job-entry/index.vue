<template>
  <van-search v-model="keywords" placeholder="请输入员工/岗位/部门搜索" input-align="center" @search="setKeywordsAndSearch" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="empName(item)" is-link
      :url="`job-entry/detail?id=${item.id}`" />
  </van-list>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { EntryJobStatus } from './jobEntry'

const list = ref([])
const finished = ref(false)
const loading = ref(false)
const keywords = ref('')
const form = reactive({
  keywords: '',
  page: 1,
  size: 25,
})

const empName = (item: any) => {
  return `【${item.deptName} - ${item.jobDictName}】${item.name}`;
}

function setKeywordsAndSearch() {
  form.page = 1
  form.size = 25
  form.keywords = keywords.value
  search(true)
}

function search(reset: boolean) {
  loading.value = true
  const param: any = { ...form }
  // 等待审批中，入职审批中
  param.entryJobStatuses = [EntryJobStatus.WAIT_FOR_APPROVAL.code, EntryJobStatus.IN_APPROVAL.code]
  Api.req('/passed-candidate/query-job-entry').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      finished.value = true
    }
    form.page = form.page + 1
    if (!reset) {
      data.forEach(e => list.value.push(e))
    }
    else {
      list.value = data
    }
  }).finally(() => loading.value = false).get()
}

function onLoad() {
  search(false)
}

</script>

<route lang="json5">
{
  name: 'PassedCandidateJobEntry'
}
</route>
