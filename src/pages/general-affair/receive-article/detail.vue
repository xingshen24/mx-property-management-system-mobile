<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="文章标题" :value="detail.title" />
      <van-cell title="文件编号" :value="detail.articleNo" />
      <van-cell title="来文单位" :value="detail.sender" />
      <van-cell title="来文日期" :value="detail.receiveDate" />
      <van-cell title="紧急程度" :value="GetUrgencyName(detail.urgency)" />
      <van-cell title="秘级" :value="GetClassificationName(detail.classification)" />
      <van-cell title="文章内容" :value="detail.content" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
      <van-cell title="发起人" :value="detail.recordEmpName" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ReceiveArticleDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetClassificationName, GetUrgencyName } from '../common/common';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  title: '',
  articleNo: '',
  sender: '',
  receiveDate: '',
  urgency: <number | null>null,
  classification: <number | null>null,
  content: '',
  approvalState: <number | null>null,
  recordEmpId: <number | null>null,
  recordEmpName: '',
  remark: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/receive-article/detail-for-view').query({ id }).success(data => {
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
  name: 'ReceiveArticleDetail'
}
</route>
