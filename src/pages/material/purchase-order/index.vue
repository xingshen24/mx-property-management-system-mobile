<template>
  <van-search v-model="keywords" placeholder="请输入采购单号/仓库/用途" input-align="center" @search="setKeywordsAndSearch" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="proposalTitle(item)" is-link
      :url="`purchase-order/detail?id=${item.id}`" />
  </van-list>
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'

const list = ref([])
const finished = ref(false)
const loading = ref(false)
const keywords = ref('')
const form = reactive({
  keywords: '',
  page: 1,
  size: 25,
})

const proposalTitle = (item: any) => {
  if (item.transferWarehouseName != null && item.transferWarehouseName != '') {
    return `【${item.transferWarehouseName}】【${item.orderNo}】${item.purpose}`;
  } else {
    return `【${item.warehouseName}】【${item.orderNo}】${item.purpose}`;
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
  Api.req('/purchase-order/query').query(param).success((data: any[]) => {
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
  name: 'PurchaseOrder'
}
</route>
