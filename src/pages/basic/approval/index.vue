<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="item.title" />
  </van-list>
</template>
<script lang="ts" setup>
import { Api } from '@/utils/request';

const list = ref([]);
const finished = ref(false);
const loading = ref(false);
const page = reactive({
  page: 1,
  size: 25
})
const onLoad = () => {
  loading.value = true;
  const param = { ...page }
  Api.req('/workflow/query-workflow-task').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      finished.value = true;
    }
    page.page = page.page + 1;
    data.forEach((e) => list.value.push(e))
  }).finally(() => loading.value = false).get()
}
</script>
<route lang="json5">
{
  name: 'MyApproval'
}
</route>
