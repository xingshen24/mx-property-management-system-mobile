<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="会议室" :value="detail.meetingRoomName" />
      <van-cell title="负责人" :value="detail.responsibleEmpName" />
      <van-cell title="记录人" :value="detail.recordEmpName" />
      <van-cell title="会议类型" :value="GetMeetingTypeName(detail.meetingType)" />
      <van-cell title="会议日期" :value="detail.meetingDate" />
      <van-cell title="会议时间" :value="detail.beginTime + ' - ' + detail.endTime" />
      <van-cell title="主题" :value="detail.theme" />
      <van-cell title="内容" :value="detail.content" />
      <van-cell title="参会人" :value="collectName(detail.participantEmps)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="MeetingDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetMeetingTypeName } from './meeting';
import { collectName, type IdName } from '@/pages/common/common';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  meetingRoomId: <number | null>null,
  meetingRoomName: '',
  responsibleEmpId: <number | null>null,
  responsibleEmpName: '',
  recordEmpId: <number | null>null,
  recordEmpName: '',
  meetingDate: '',
  meetingType: <number | null>null,
  beginTime: '',
  endTime: '',
  theme: '',
  content: '',
  participantEmps: <IdName[]>[],
  attachments: <FileAttachment[]>[]
});

Api.req('/meeting/detail-for-view').query({ id }).success(data => {
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
  name: 'MeetingDetail'
}
</route>
