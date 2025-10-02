<template>
  <van-search v-model="keywords" placeholder="请输入文章标题/文件编号/来文单位" input-align="center" @search="setKeywordsAndSearch" />
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="receiveItemTitle(item)" is-link
      :url="`receive-article/detail?id=${item.id}`" />
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

const receiveItemTitle = (item: any) => {
  if (item.articleNo != null) {
    return `【${item.articleNo}】${item.title}`
  }
  return `${item.title}`;
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
  Api.req('/receive-article/query').query(param).success((data: any[]) => {
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
  name: 'ReceiveArticle'
}
</route>
