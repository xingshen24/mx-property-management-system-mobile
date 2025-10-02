<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="决议编号" :value="detail.no" />
      <van-cell title="主送单位" :value="detail.mainReceiveUnit" />
      <van-cell title="抄送单位" :value="detail.carbonCopyUnit" />
      <van-cell title="秘级" :value="GetClassificationName(detail.classification)" />
      <van-cell title="文件标题" :value="detail.title" />
      <van-cell title="份数" :value="`${detail.copy}份`" />
      <van-cell title="记录人" :value="detail.recordEmpName" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="OfficeMeetingResolutionDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetClassificationName } from '../common/common';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  proposalId: <number | null>null,
  proposalName: '',
  no: '',
  mainReceiveUnit: '',
  carbonCopyUnit: '',
  classification: <number | null>null,
  title: '',
  copy: <number | null>null,
  recordEmpId: <number | null>null,
  recordEmpName: '',
  remark: '',
  approvalState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/office-meeting-resolution/detail-for-view').query({ id }).success(data => {
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
  name: 'OfficeMeetingResolutionDetail'
}
</route>
