<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="领款部门" :value="detail.deptName" />
      <van-cell title="领款人" :value="detail.empName" />
      <van-cell title="领款金额" :value="detail.amount" />
      <van-cell title="领款用途" :value="detail.purpose" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="GetGeneralWithFinanceReviewApprovalStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ReceivePaymentDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetGeneralWithFinanceReviewApprovalStateName } from '../common/finance';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  deptName: '',
  empId: <number | null>null,
  empName: '',
  amount: '',
  purpose: '',
  remark: '',
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/receive-payment/detail-for-view').query({ id }).success(data => {
  coverReactive(detail, data);
}).get();

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
  name: 'ReceivePaymentDetail'
}
</route>
