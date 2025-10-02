<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="报销部门" :value="detail.deptName" />
      <van-cell title="报销日期" :value="detail.date" />
      <van-cell title="报销人" :value="detail.reimburseEmpName" />
      <van-cell title="领款人" :value="detail.payeeEmpName" />
      <van-cell title="报销金额" :value="`${detail.totalAmount}元`" />
      <van-cell title="单据及附件总页数" :value="detail.pageCount" />
      <van-cell title="审批状态" :value="GetGeneralWithFinanceReviewApprovalStateName(detail.approvalState)" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">单据明细</div>
    <van-cell-group inset>
      <van-cell v-for="item in detail.items" :key="item.id" :title="item.purpose">
        <template #default>
          <van-highlight :keywords="`${item.amount}元`" :source-string="`${item.amount}元`"
            style="--van-highlight-tag-color:var(--van-cell-text-color);" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ReimburseDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetGeneralWithFinanceReviewApprovalStateName } from '../common/finance';

const route = useRoute();
const id = route.query.id;

const loading = ref(false)
const finished = ref(false)

const detail = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  deptName: '',
  date: '',
  reimburseEmpId: <number | null>null,
  reimburseEmpName: '',
  payeeEmpId: <number | null>null,
  payeeEmpName: '',
  totalAmount: '',
  pageCount: <number | null>null,
  approvalState: <number | null>null,
  remark: '',
  items: [],
  attachments: <FileAttachment[]>[]
});

let reslove = null, reject = null
const itemPromise = new Promise((resloveFn, rejectFn) => {
  reslove = resloveFn;
  reject = rejectFn;
});

Api.req('/reimburse/detail-for-view').query({ id }).success(data => {
  coverReactive(detail, data);
  reslove(detail.items)
  itemPromise.then(() => {
    loading.value = false
    finished.value = true
  })
}).fail((error) => reject(error)).get();

const itemTitle = (item: any) => {
  return `${item.purpose} - ${item.amount}元`
}

const onLoad = () => loading.value = true;

</script>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;

  .data-label {
    color: #969799;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }

  .data-label-top {
    margin-bottom: 10px;
  }

  .data-label-not-top {
    margin-top: 15px;
    margin-bottom: 10px;
  }
}
</style>
<route lang="json5">
{
  name: 'ReimburseDetail'
}
</route>
