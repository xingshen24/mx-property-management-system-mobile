<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="文章标题" :value="detail.title" />
      <van-cell title="文件编号" :value="detail.articleNo" />
      <van-cell title="主题词" :value="detail.theme" />
      <van-cell title="上报信息" :value="detail.report" />
      <van-cell title="文章内容" :value="detail.content" />
      <van-cell title="紧急程度" :value="GetUrgencyName(detail.urgency)" />
      <van-cell title="秘级" :value="GetClassificationName(detail.classification)" />
      <van-cell title="主送人" :value="collectName(detail.mainReceiveEmps)" />
      <van-cell title="抄送人" :value="collectName(detail.carbonCopyEmps)" />
      <van-cell title="核稿人" :value="collectName(detail.reviewEmps)" />
      <van-cell title="会签部门" :value="collectName(detail.countersignDepts)" />
      <van-cell title="拟稿人" :value="detail.draftEmpName" />
      <van-cell title="状态" :value="GetTieredApprovalStateName(detail.approvalState)" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="PublishArticleDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetClassificationName, GetUrgencyName } from '../common/common';
import { GetTieredApprovalStateName } from '@/pages/approval/approval';
import { collectName } from '@/pages/common/common';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  title: '',
  articleNo: '',
  theme: '',
  report: '',
  content: '',
  urgency: <number | null>null,
  classification: <number | null>null,
  draftEmpId: <number | null>null,
  draftEmpName: '',
  remark: '',
  approvalState: <number | null>null,
  carbonCopyEmps: <IdName[]>[],
  mainReceiveEmps: <IdName[]>[],
  reviewEmps: <IdName[]>[],
  countersignDepts: <IdName[]>[],
  attachments: <FileAttachment[]>[]
});

Api.req('/publish-article/detail-for-view').query({ id }).success(data => {
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
  name: 'PublishArticleDetail'
}
</route>
