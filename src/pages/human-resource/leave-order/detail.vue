<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="申请人" :value="detail.empName" />
      <van-cell title="所在部门" :value="detail.deptName" />
      <van-cell title="申请时间" :value="detail.applyTime" />
      <van-cell title="请假开始时间" :value="detail.beginTime" />
      <van-cell title="请假结束时间" :value="detail.endTime" />
      <van-cell title="请假种类" :value="GetLeaveTypeName(detail.leaveType)" />
      <van-cell title="工作日数" :value="detail.weekdays" />
      <van-cell title="请假的事由" :value="detail.reason" />
      <van-cell title="发起人" :value="detail.promoteEmpName" />
      <van-cell title="审批状态" :value="GetDualTrackProcessStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="LeaveOrderDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetDualTrackProcessStateName } from '@/pages/approval/approval';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetLeaveTypeName } from './leaveOrder';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  empId: <number | null>null,
  empName: '',
  deptId: <number | null>null,
  deptName: '',
  applyTime: '',
  beginTime: '',
  endTime: '',
  leaveType: <number | null>null,
  weekdays: '',
  reason: '',
  promoteEmpId: <number | null>null,
  promoteEmpName: '',
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/leave-order/detail-for-view').query({ id }).success(data => {
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
  name: 'LeaveOrderDetail'
}
</route>
