<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="应聘部门" :value="detail.employingDeptName" />
      <van-cell title="应聘岗位" :value="detail.jobDictName" />
      <van-cell title="应聘者" :value="detail.name" />
      <van-cell title="性别" :value="GetGenderNameByCode(detail.gender)" />
      <van-cell title="出生日期" :value="detail.birthday" />
      <van-cell title="年龄" :value="detail.age != null ? `${detail.age}岁` : ''" />
      <van-cell title="联系方式" :value="detail.contact" />
      <van-cell title="地址" :value="detail.address" />
      <van-cell title="学历" :value="detail.educationalBackgroundDictName" />
      <van-cell title="毕业学校" :value="detail.graduateSchool" />
      <van-cell title="参加工作时间" :value="detail.careerStartDate" />
      <van-cell title="期望薪资" :value="detail.expectedSalary" />
      <van-cell title="面试" :value="detail.passed ? '通过' : '未通过'" />
      <van-cell title="拒绝方" :value="GetRecruitmentRejectSideByCode(detail.rejectSide)" />
      <van-cell title="拒绝理由" :value="detail.rejectReason" />
      <van-cell title="拒绝时间" :value="detail.rejectDate" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="CandidateDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetGenderNameByCode } from '../employee/employee';
import { GetRecruitmentRejectSideByCode } from '../recruitment-intention/recruitment';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  recruitmentId: <number | null>null,
  recruitmentName: '',
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
  expectedSalary: '',
  passed: '',
  rejectSide: <number | null>null,
  rejectReason: '',
  rejectDate: '',
  remark: '',
  inTalentPool: '',
  jobDictId: <number | null>null,
  jobDictName: '',
  employingDeptId: <number | null>null,
  employingDeptName: '',
});

Api.req('/candidate/detail-for-view').query({ id }).success(data => {
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
  name: 'TalentPoolCandidateDetail'
}
</route>
