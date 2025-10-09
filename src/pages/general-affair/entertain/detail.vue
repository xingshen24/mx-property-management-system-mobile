<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="接待部门" :value="detail.deptName" />
      <van-cell title="接待时间" :value="detail.entertainTime" />
      <van-cell title="来访单位及来访人" :value="detail.visitor" />
      <van-cell title="来访人数" :value="detail.visitorNumber" />
      <van-cell title="事由" :value="detail.matter" />
      <van-cell title="内容" :value="detail.content" />
      <van-cell title="用餐人数（含陪同）" :value="detail.dinnerNumber" />
      <van-cell title="用餐地点" :value="detail.dinnerLocation" />
      <van-cell title="餐别" :value="detail.dinnerTypeDictName" />
      <van-cell title="预估餐费" :value="detail.dinnerEstimatedCost != null ? `${detail.dinnerEstimatedCost}元` : ''" />
      <van-cell title="住宿地点" :value="detail.stayLocation" />
      <van-cell title="入住时间" :value="detail.stayTime" />
      <van-cell title="房间数" :value="detail.roomNumber" />
      <van-cell title="预计住宿费" :value="detail.roomEstimatedCost != null ? `${detail.roomEstimatedCost}元` : ''" />
      <van-cell title="合计费用" :value="detail.totalConst" />
      <van-cell title="经办人" :value="detail.operatorEmpName" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="EntertainDetail">
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
  entertainTime: '',
  visitor: '',
  visitorNumber: <number | null>null,
  matter: '',
  content: '',
  dinnerNumber: <number | null>null,
  dinnerLocation: '',
  dinnerTypeDictId: <number | null>null,
  dinnerTypeDictName: '',
  dinnerEstimatedCost: '',
  stayLocation: '',
  stayTime: '',
  roomNumber: <number | null>null,
  roomEstimatedCost: '',
  totalConst: '',
  operatorEmpId: <number | null>null,
  operatorEmpName: '',
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/entertain/detail-for-view').query({ id }).success(data => {
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
  name: 'EntertainDetail'
}
</route>
