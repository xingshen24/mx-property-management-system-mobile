<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="接待部门" :value="detail.deptName" />
      <van-cell title="接待时间" :value="detail.mealTime" />
      <van-cell title="接待事由" :value="detail.reason" />
      <van-cell title="用餐地点" :value="detail.diningLocation" />
      <van-cell title="用餐人数" :value="detail.diningNum + '人'" />
      <van-cell title="经办人" :value="detail.operatorEmpName" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="MealExpenseDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  deptName: '',
  mealTime: '',
  reason: '',
  diningLocation: '',
  diningNum: <number | null>null,
  operatorEmpId: <number | null>null,
  operatorEmpName: '',
  remark: '',
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/meal-expense/detail-for-view').query({ id }).success(data => {
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
  name: 'MealExpenseDetail'
}
</route>
