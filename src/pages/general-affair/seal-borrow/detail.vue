<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="用章" :value="detail.sealName" />
      <van-cell title="借阅人" :value="detail.borrowEmpName" />
      <van-cell title="借出时间" :value="detail.borrowTime" />
      <van-cell title="预计归还时间" :value="detail.expectedReturnTime" />
      <van-cell title="借出事由" :value="detail.reason" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
      <van-cell title="归还状态" v-if="detail.returnState != null" :value="GetBorrowReturnStateName(detail.returnState)" />
      <van-cell title="实际归还时间" :value="detail.realReturnTime" />
      <van-cell title="归还备注" :value="detail.returnRemark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">申请材料</div>
    <file-attachments :files="detail.applyMaterials" />
    <div v-if="detail.useMaterials != null && detail.useMaterials.length > 0">
      <div class="data-label data-label-not-top">使用材料</div>
      <file-attachments :files="detail.useMaterials" />
    </div>
  </div>
</template>
<script setup lang="ts" name="SealBorrowDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetBorrowReturnStateName } from './seal';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  sealId: <number | null>null,
  sealName: '',
  borrowEmpId: <number | null>null,
  borrowEmpName: '',
  borrowTime: '',
  expectedReturnTime: '',
  reason: '',
  remark: '',
  approvalState: <number | null>null,
  returnState: <number | null>null,
  realReturnTime: '',
  returnRemark: '',
  applyMaterials: <FileAttachment[]>[],
  useMaterials: <FileAttachment[]>[]
});

Api.req('/seal-borrow/detail-for-view').query({ id }).success(data => {
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
  name: 'SealBorrowDetail'
}
</route>
