<template>
  <van-tabs v-model:active="active">
    <van-tab title="待提交" name="waitToSubmit">
      <van-search v-model="waitForSubmit.keywords" placeholder="请输入部门/事由" input-align="center"
        @search="setKeywordsAndSearch(waitForSubmitForm, waitForSubmit, waitForSubmit.keywords)" />
      <van-list v-model:loading="waitForSubmit.loading" :finished="waitForSubmit.finished" finished-text="没有更多了"
        @load="load(waitForSubmitForm, waitForSubmit)">
        <van-cell v-for="item in waitForSubmit.list" :key="item.id" :title="title(item)" is-link
          :url="`entertain/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="审批中" name="handling">
      <van-search v-model="handling.keywords" placeholder="请输入部门/事由" input-align="center"
        @search="setKeywordsAndSearch(handlingForm, handling, handling.keywords)" />
      <van-list v-model:loading="handling.loading" :finished="handling.finished" finished-text="没有更多了"
        @load="load(handlingForm, handling)">
        <van-cell v-for="item in handling.list" :key="item.id" :title="title(item)" is-link
          :url="`entertain/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已通过" name="approved">
      <van-search v-model="approved.keywords" placeholder="请输入部门/事由" input-align="center"
        @search="setKeywordsAndSearch(approvedForm, approved, approved.keywords)" />
      <van-list v-model:loading="approved.loading" :finished="approved.finished" finished-text="没有更多了"
        @load="load(approvedForm, approved)">
        <van-cell v-for="item in approved.list" :key="item.id" :title="title(item)" is-link
          :url="`entertain/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已取消" name="cancel">
      <van-search v-model="cancel.keywords" placeholder="请输入部门/事由" input-align="center"
        @search="setKeywordsAndSearch(cancelForm, cancel, cancel.keywords)" />
      <van-list v-model:loading="cancel.loading" :finished="cancel.finished" finished-text="没有更多了"
        @load="load(cancelForm, cancel)">
        <van-cell v-for="item in cancel.list" :key="item.id" :title="title(item)" is-link
          :url="`entertain/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
  <van-floating-bubble axis="lock" icon="plus" @click="newEntertain" />
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { GeneralProcessState } from '@/pages/approval/approval';
interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  approvalStates: number[];
}

interface Table {
  list: any[];
  finished: boolean;
  loading: boolean;
  keywords: string;
}

const waitForSubmit = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const waitForSubmitForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  approvalStates: [
    GeneralProcessState.DRAFT.code,
    GeneralProcessState.REJECT.code
  ]
})

const handling = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const handlingForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  approvalStates: [
    GeneralProcessState.DEPT_HEAD_PROCESSING.code,
    GeneralProcessState.DEPT_LEADER_PROCESSING.code,
    GeneralProcessState.GM_PROCESSING.code
  ]
})

const approved = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const approvedForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  approvalStates: [GeneralProcessState.APPROVE.code]
})

const cancel = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const cancelForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  approvalStates: [GeneralProcessState.CANCEL.code]
})


const active = ref('');

function setKeywordsAndSearch(form: SearchForm, table: Table, kewords: string) {
  form.page = 1
  form.size = 25
  form.keywords = kewords;
  search(true, form, table);
}

function search(reset: boolean, form: SearchForm, table: Table) {
  table.loading = true
  const param = { ...form }
  Api.req('/entertain/query').query(param).success((data: any[]) => {
    data = data ?? []
    if (data.length < param.size) {
      table.finished = true
    }
    form.page = form.page + 1
    if (!reset) {
      data.forEach(e => table.list.push(e))
    }
    else {
      table.list = data
    }
  }).finally(() => table.loading = false).get()
}

function load(form: SearchForm, table: Table) {
  search(false, form, table);
}

function title(item: any) {
  return `【${item.deptName}】${item.matter}`
}

const router = useRouter();
const newEntertain = () => {
  router.push('/general-affair/entertain/form')
}

</script>

<route lang="json5">
{
  name: 'EntertainManagement'
}
</route>
