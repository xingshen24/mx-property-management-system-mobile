<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="标题" :value="detail.title" />
      <van-cell title="提交人" :value="detail.submitEmpName" />
      <van-cell title="接收人" :value="detail.receiveEmpName" />
      <van-cell title="提交时间" :value="detail.submitTime" />
      <van-cell title="内容" :value="detail.content" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';


const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  submitEmpId: <number | null>null,
  submitEmpName: '',
  submitTime: '',
  receiveEmpId: <number | null>null,
  receiveEmpName: '',
  title: '',
  content: '',
  attachments: <FileAttachment[]>[]
})

Api.req('/budget-report/detail-for-view').query({ id }).success(data => {
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
  name: 'BudgetReportDetail'
}
</route>