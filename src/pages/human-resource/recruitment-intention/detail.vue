<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="用人部门" :value="detail.employingDeptName" />
      <van-cell title="职位名称" :value="detail.jobDictName" />
      <van-cell title="招聘人数" :value="detail.recruitingNumber" />
      <van-cell title="岗位要求" :value="detail.requirement" />
      <van-cell title="起草人" :value="detail.draftEmpName" />
      <van-cell title="意向处理状态" :value="GetIntentionHandleStateName(detail.intentionState)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="RecruitmentIntentionDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { GetIntentionHandleStateName } from '@/utils/approvalState';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  employingDeptId: <number | null>null,
  employingDeptName: '',
  jobDictId: <number | null>null,
  jobDictName: '',
  recruitingNumber: '',
  requirement: '',
  draftEmpId: <number | null>null,
  draftEmpName: '',
  intentionState: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/recruitment-intention/detail-for-view').query({ id }).success(data => {
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
  name: 'RecruitmentIntentionDetail'
}
</route>
