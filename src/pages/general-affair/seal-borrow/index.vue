<template>
  <van-tabs v-model:active="active">
    <van-tab title="待提交" name="waitToSubmit">
      <van-search v-model="waitForSubmit.keywords" placeholder="请输入用章类型/借阅人/出借事由" input-align="center"
        @search="setKeywordsAndSearch(waitForSubmitForm, waitForSubmit, waitForSubmit.keywords)" />
      <van-list v-model:loading="waitForSubmit.loading" :finished="waitForSubmit.finished" finished-text="没有更多了"
        @load="load(waitForSubmitForm, waitForSubmit)">
        <van-cell v-for="item in waitForSubmit.list" :key="item.id" :title="title(item)" is-link
          :url="`seal-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="审批中" name="handling">
      <van-search v-model="handling.keywords" placeholder="请输入用章类型/借阅人/出借事由" input-align="center"
        @search="setKeywordsAndSearch(handlingForm, handling, handling.keywords)" />
      <van-list v-model:loading="handling.loading" :finished="handling.finished" finished-text="没有更多了"
        @load="load(handlingForm, handling)">
        <van-cell v-for="item in handling.list" :key="item.id" :title="title(item)" is-link
          :url="`seal-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="待归还" name="notReturn">
      <van-search v-model="notReturn.keywords" placeholder="请输入用章类型/借阅人/出借事由" input-align="center"
        @search="setKeywordsAndSearch(notReturnForm, notReturn, notReturn.keywords)" />
      <van-list v-model:loading="notReturn.loading" :finished="notReturn.finished" finished-text="没有更多了"
        @load="load(notReturnForm, notReturn)">
        <van-cell v-for="item in notReturn.list" :key="item.id" :title="title(item)" is-link
          :url="`seal-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已归还" name="returned">
      <van-search v-model="returned.keywords" placeholder="请输入用章类型/借阅人/出借事由" input-align="center"
        @search="setKeywordsAndSearch(returnedForm, returned, returned.keywords)" />
      <van-list v-model:loading="returned.loading" :finished="returned.finished" finished-text="没有更多了"
        @load="load(returnedForm, returned)">
        <van-cell v-for="item in returned.list" :key="item.id" :title="title(item)" is-link
          :url="`seal-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
    <van-tab title="已取消" name="cancel">
      <van-search v-model="cancel.keywords" placeholder="请输入用章类型/借阅人/出借事由" input-align="center"
        @search="setKeywordsAndSearch(cancelForm, cancel, cancel.keywords)" />
      <van-list v-model:loading="cancel.loading" :finished="cancel.finished" finished-text="没有更多了"
        @load="load(cancelForm, cancel)">
        <van-cell v-for="item in cancel.list" :key="item.id" :title="title(item)" is-link
          :url="`seal-borrow/detail?id=${item.id}`" />
      </van-list>
    </van-tab>
  </van-tabs>
  <van-floating-bubble axis="lock" icon="plus" @click="newSealBorrow" />
</template>

<script lang="ts" setup>
import { Api } from '@/utils/request'
import { BorrowReturnState } from './seal';
import { GeneralProcessState } from '@/pages/approval/approval';
interface SearchForm {
  keywords: string;
  page: number;
  size: number;
  approvalStates: number[];
  returnState?: number;
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

const notReturn = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const notReturnForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  returnState: BorrowReturnState.NOT_RETURN.code,
  approvalStates: [GeneralProcessState.APPROVE.code]
})

const returned = reactive<Table>({
  list: [],
  finished: false,
  loading: false,
  keywords: '',
})

const returnedForm = reactive<SearchForm>({
  keywords: '',
  page: 1,
  size: 25,
  returnState: BorrowReturnState.RETURNED.code,
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
  Api.req('/seal-borrow/query').query(param).success((data: any[]) => {
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
  return `【${item.borrowTime.substring(0, 10)}】【${item.sealName}】【${item.borrowEmpName}】${item.reason}`
}

const router = useRouter();
const newSealBorrow = () => {
  router.push('seal-borrow/form')
}

</script>

<route lang="json5">
{
  name: 'SealBorrowManagement'
}
</route>
