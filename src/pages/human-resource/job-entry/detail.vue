<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="职位名称" :value="detail.jobDictName" />
      <van-cell title="用人部门" :value="detail.deptName" />
      <van-cell title="应聘者名字" :value="detail.name" />
      <van-cell title="性别" :value="GetGenderNameByCode(detail.gender)" />
      <van-cell title="出生日期" :value="detail.birthday" />
      <van-cell title="年龄" :value="detail.age" />
      <van-cell title="联系方式" :value="detail.contact" />
      <van-cell title="地址" :value="detail.address" />
      <van-cell title="学历" :value="detail.educationalBackgroundDictName" />
      <van-cell title="毕业学校" :value="detail.graduateSchool" />
      <van-cell title="参加工作时间" :value="detail.careerStartDate" />
      <van-cell title="入职状态" :value="GetEntryJobStatusName(detail.entryJobStatus)" />
    </van-cell-group>
    <div class="data-label data-label-not-top">入职材料</div>
    <file-attachments :files="detail.jobEntryAttachments" />
  </div>
</template>
<script setup lang="ts" name="PassedCandidateDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetEntryJobStatusName } from './jobEntry';
import { GetGenderNameByCode } from '../employee/employee';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  candidateId: <number | null>null,
  candidateName: '',
  empId: <number | null>null,
  empName: '',
  jobDictId: <number | null>null,
  jobDictName: '',
  deptId: <number | null>null,
  deptName: '',
  name: '',
  gender: <number | null>null,
  birthday: '',
  age: <number | null>null,
  contact: '',
  address: '',
  educationalBackgroundDictId: <number | null>null,
  educationalBackgroundDictName: '',
  graduateSchool: '',
  careerStartDate: '',
  entryJobStatus: <number | null>null,
  jobEntryAttachments: <FileAttachment[]>[],
  passProbationAttachments: <FileAttachment[]>[]
});

Api.req('/passed-candidate/detail-for-view').query({ id }).success(data => {
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
  name: 'PassedCandidateDetail'
}
</route>
