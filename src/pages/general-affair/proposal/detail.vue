<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="提议日期" :value="detail.date" />
      <van-cell title="部门" :value="detail.deptName" />
      <van-cell title="提议人" :value="detail.proposerEmpName" />
      <van-cell title="议案标题" :value="detail.title" />
      <van-cell title="提议内容" :value="detail.content" />
      <van-cell title="会议状况" :value="detail.meetingId == null ? '未开' : '已开'" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ProposalDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  date: '',
  deptId: <number | null>null,
  deptName: '',
  proposerEmpId: <number | null>null,
  proposerEmpName: '',
  title: '',
  content: '',
  meetingId: <number | null>null,
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/proposal/detail-for-view').query({ id }).success(data => {
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
  name: 'ProposalDetail'
}
</route>
