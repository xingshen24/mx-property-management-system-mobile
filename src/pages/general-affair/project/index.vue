<template>
  <van-search v-model="keywords" placeholder="请输入申请部门/项目名称" input-align="center" @search="setKeywordsAndSearch" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="projectTitle(item)" is-link :url="getDetailURL(item)" />
  </van-list>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { ProjectRecruitmentMethod } from './project'

const list = ref([])
const finished = ref(false)
const loading = ref(false)
const keywords = ref('')
const form = reactive({
  keywords: '',
  page: 1,
  size: 25,
})

const projectTitle = (item: any) => {
  return `【${item.applyDeptName}】${item.projectName}`;
}

const getDetailURL = (item: any) => {
  if (item.recruitmentMethod == ProjectRecruitmentMethod.INQUIRY.code) {
    return `project/inquiry-detail?id=${item.id}`
  } else {
    return `project/comparative-selection-detail?id=${item.id}`
  }
}

function setKeywordsAndSearch() {
  form.page = 1
  form.size = 25
  form.keywords = keywords.value
  search(true)
}

function search(reset: boolean) {
  loading.value = true
  const param = { ...form }
  Api.req('/project/query').query(param).success((data: any[]) => {
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
  name: 'ProjectManagement'
}
</route>
