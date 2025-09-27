<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="借阅日期" :value="detail.borrowDate" />
      <van-cell title="借阅类型" :value="GetBorrowDocumentTypeName(detail.borrowType)" />
      <van-cell title="档案名称" :value="detail.documentName" />
      <van-cell title="借阅目的" :value="detail.purpose" />
      <van-cell title="借阅部门" :value="detail.borrowerDeptName" />
      <van-cell title="借阅人" :value="detail.borrowerEmpName" />
      <van-cell title="出借部门" :value="detail.lenderDeptName" />
      <van-cell title="出借人" :value="detail.lenderEmpName" />
      <van-cell title="借阅方式" :value="GetBorrowTypeName(detail.borrowType)" />
      <van-cell title="预计归还日期" :value="detail.expectReturnDate" />
      <van-cell title="实际归还日期" :value="detail.realReturnDate" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
      <van-cell title="出借状态" :value="GetLendStateName(detail.lendState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetBorrowDocumentTypeName, GetBorrowTypeName, GetLendStateName } from './borrow';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';


const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  borrowDate: '',
  documentName: '',
  documentType: <number | null>null,
  purpose: '',
  borrowerEmpId: <number | null>null,
  borrowerEmpName: '',
  borrowerDeptId: <number | null>null,
  borrowerDeptName: '',
  lenderEmpId: <number | null>null,
  lenderEmpName: '',
  lenderDeptId: <number | null>null,
  lenderDeptName: '',
  borrowType: <number | null>null,
  pages: <number | null>null,
  expectReturnDate: '',
  realReturnDate: '',
  remark: '',
  approvalState: <number | null>null,
  lendState: <number | null>null,
  attachments: <FileAttachment[]>[]
})

Api.req('/document-borrow/detail-for-view').query({ id }).success(data => {
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
  name: 'MyDocumentBorrowDetail'
}
</route>