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
      <van-cell title="选聘方式" :value="GetProjectRecruitmentMethodName(detail.recruitmentMethod)" />
      <van-cell title="评选方式" :value="GetProjectSelectionMethodName(detail.selectionMethod)" />
      <van-cell title="近年完成的类似项目的时间要求" :value="detail.referencePeriodStart + ' ~ ' + detail.referencePeriodEnd" />
      <van-cell title="办公室决议号" :value="detail.officeMeetingResolutionName" />
      <van-cell title="重大违法情况审核年限时间"
        :value="detail.seriousViolationReviewStart + ' ~ ' + detail.seriousViolationReviewEnd" />
      <van-cell title="重要条款" :value="detail.importantTerms" />
      <van-cell title="组织现场勘察" :value="detail.organizeSiteInvestigation ? '组织' : '不组织'" />
      <van-cell title="其他事项说明" :value="detail.otherTerms" />
      <van-cell title="多部门会签" :value="detail.needCountersign ? '需要会签' : '无需会签'" />
      <van-cell title="会签部门" v-if="detail.needCountersign" :value="collectName(detail.countersignDepts)" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="审批状态" :value="GetTieredApprovalStateName(detail.approvalState)" />
      <van-cell title="项目进度" :value="GetProjectProgressName(detail.progress)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">申请材料</div>
    <file-attachments :files="detail.approvalAttachments" />
    <div class="data-label data-label-not-top">比选文件制作</div>
    <van-cell-group inset>
      <van-cell title="制作部门" :value="detail.documentMakerDeptName" />
      <van-cell title="制作人" :value="detail.documentMakerEmpName" />
      <van-cell title="完成时间" :value="detail.documentCompletionTime" />
      <van-cell title="完成备注" :value="detail.documentCompletionRemark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">比选文件附件</div>
    <file-attachments :files="detail.comparisonDocumentAttachments" />
    <div class="data-label data-label-not-top">邀标</div>
    <van-cell-group inset>
      <van-cell title="邀标部门" :value="detail.inviteDeptName" />
      <van-cell title="邀标员工" :value="detail.inviteEmpName" />
      <van-cell title="邀标时间" :value="detail.inviteBidderTime" />
      <van-cell title="邀标备注" :value="detail.inviteBidderRemark" />
    </van-cell-group>

    <div class="data-label data-label-not-top">邀标附件</div>
    <file-attachments :files="detail.bidInviteDocumentAttachments" />
    <div class="data-label data-label-not-top">收标</div>
    <van-cell-group inset>
      <van-cell title="收标部门" :value="detail.receiveDeptName" />
      <van-cell title="收标人" :value="detail.receiveEmpName" />
      <van-cell title="收标完成时间" :value="detail.receiveBidCompletionTime" />
      <van-cell title="完成邀标备注" :value="detail.receiveBidCompletionRemark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">收标附件</div>
    <file-attachments :files="detail.bidReceiveDocumentAttachments" />
    <div v-if="detail.bidders != null && detail.bidders.length > 0">
      <div class="data-label data-label-not-top">投标人</div>
      <van-cell-group inset>
        <van-cell v-for="(item, index) in detail.bidders" :title="`投标人${index + 1}`" :value="item.name" />
      </van-cell-group>
    </div>
    <div class="data-label data-label-not-top">开标</div>
    <van-cell-group inset>
      <van-cell title="开标时间" :value="detail.openBidTime" />
      <van-cell title="中标人" :value="detail.winningBidderName" />
      <van-cell title="开标备注" :value="detail.openBidRemark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">开标附件</div>
    <file-attachments :files="detail.openBidAttachments" />
  </div>
</template>
<script setup lang="ts" name="ProjectDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetProjectProgressName, GetProjectRecruitmentMethodName, GetProjectSelectionMethodName } from './project';
import { GetTieredApprovalStateName } from '@/pages/approval/approval';
import { collectName, type IdName } from '@/pages/common/common';

const route = useRoute();
const projectId = route.query.id;

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
  countersignDepts: <IdName[]>[],
  remark: '',
  approvalState: <number | null>null,
  progress: <number | null>null,
  approvalAttachments: <FileAttachment[]>[],
  documentMakerDeptId: <number | null>null,
  documentMakerDeptName: '',
  documentMakerEmpId: <number | null>null,
  documentMakerEmpName: '',
  documentCompletionTime: '',
  documentCompletionRemark: '',
  comparisonDocumentAttachments: <FileAttachment[]>[],
  inviteDeptId: <number | null>null,
  inviteDeptName: '',
  inviteEmpId: <number | null>null,
  inviteEmpName: '',
  inviteBidderTime: '',
  inviteBidderRemark: '',
  bidInviteDocumentAttachments: <FileAttachment[]>[],
  receiveDeptId: <number | null>null,
  receiveDeptName: '',
  receiveEmpId: <number | null>null,
  receiveEmpName: '',
  receiveBidCompletionTime: '',
  receiveBidCompletionRemark: '',
  bidReceiveDocumentAttachments: <FileAttachment[]>[],
  bidders: <IdName[]>[],
  openBidTime: '',
  winningBidderId: <number | null>null,
  winningBidderName: '',
  openBidRemark: '',
  openBidAttachments: <FileAttachment[]>[]
});

Api.req('/project/comparative-selection/detail-for-view').query({ projectId }).success(data => {
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
  name: 'ComparativeSelectionDetail'
}
</route>
