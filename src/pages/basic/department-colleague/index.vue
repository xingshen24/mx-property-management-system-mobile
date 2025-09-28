<template>
  <van-search v-model="keywords" placeholder="请输入员工名称" input-align="center" @search="setKeywordsAndSearch" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="empName(item)" is-link
      :url="`employee/detail?id=${item.id}`" />
  </van-list>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'

const list = ref([])
const finished = ref(false)
const loading = ref(false)
const keywords = ref('')
const form = reactive({
  empName: '',
  page: 1,
  size: 25,
})

const empName = (emp: any) => {
  return `【${emp.empNo} - ${emp.jobName}】${emp.empName}`;
}

function setKeywordsAndSearch() {
  form.page = 1
  form.size = 25
  form.empName = keywords.value
  search(true)
}

function search(reset: boolean) {
  loading.value = true
  const param = { ...form }
  Api.req('/employee/query-colleague').query(param).success((data: any[]) => {
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
  name: 'MyDepartmentColleague'
}
</route>
