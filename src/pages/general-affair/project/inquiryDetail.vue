<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="项目名称" :value="detail.projectName" />
      <van-cell title="合同名称" :value="detail.contractName" />
      <van-cell title="法审编号" :value="detail.judicialReviewNo" />
      <van-cell title="申请部门" :value="detail.applyDeptName" />
      <van-cell title="经办人" :value="detail.operatorEmpName" />
      <van-cell title="联系方式" :value="detail.contact" />
      <van-cell title="申请时间" :value="detail.applyTime" />
      <van-cell title="项目类别" :value="detail.projectTypeDictName" />
      <van-cell title="项目概况" :value="detail.projectOverview" />
      <van-cell title="质量要求" :value="detail.qualityRequirements" />
      <van-cell title="控制价" :value="detail.controlPrice" />
      <van-cell title="服务期" :value="detail.serviceTime + '天'" />
      <van-cell title="投标人资质" :value="detail.bidderQualification" />
      <van-cell title="选聘方式" :value="detail.recruitmentMethod" />
      <van-cell title="评选方式" :value="detail.selectionMethod" />
      <van-cell title="近年完成的类似项目的时间要求" :value="detail.referencePeriodStart + ' ~ ' + detail.referencePeriodEnd" />
      <van-cell title="办公室决议号" :value="detail.officeMeetingResolutionName" />
      <van-cell title="重大违法情况审核年限时间"
        :value="detail.seriousViolationReviewStart + ' ~ ' + detail.seriousViolationReviewEnd" />
      <van-cell title="重要条款" :value="detail.importantTerms" />
      <van-cell title="组织现场勘察" :value="detail.organizeSiteInvestigation ? '组织' : '不组织'" />
      <van-cell title="其他事项说明" :value="detail.otherTerms" />
      <van-cell title="是否需要多部门进行会签" :value="detail.needCountersign" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="detail.approvalState" />
      <van-cell title="项目进度" :value="detail.progress" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ProjectDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  projectName: '',
  contractId: <number | null>null,
  contractName: '',
  judicialReviewId: <number | null>null,
  judicialReviewNo: '',
  applyDeptId: <number | null>null,
  applyDeptName: '',
  operatorEmpId: <number | null>null,
  operatorEmpName: '',
  contact: '',
  applyTime: '',
  projectTypeDictId: <number | null>null,
  projectTypeDictName: '',
  projectOverview: '',
  qualityRequirements: '',
  controlPrice: '',
  serviceTime: <number | null>null,
  bidderQualification: '',
  recruitmentMethod: <number | null>null,
  selectionMethod: <number | null>null,
  referencePeriodStart: '',
  referencePeriodEnd: '',
  officeMeetingResolutionId: <number | null>null,
  officeMeetingResolutionName: '',
  seriousViolationReviewStart: '',
  seriousViolationReviewEnd: '',
  importantTerms: '',
  organizeSiteInvestigation: '',
  otherTerms: '',
  needCountersign: '',
  remark: '',
  approvalState: <number | null>null,
  progress: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/project/detail-for-view').query({ id }).success(data => {
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
  name: 'ProjectDetail'
}
</route>
