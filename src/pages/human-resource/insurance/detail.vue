<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="员工工号" :value="detail.empNo" />
      <van-cell title="员工姓名" :value="detail.empName" />
      <van-cell title="所在部门" :value="detail.deptName" />
      <van-cell title="在职状态" :value="GetJobStatusName(detail.jobStatus)" />
      <van-cell title="参保状态" :value="GetInsuranceStateName(detail.insuranceState)" />
      <van-cell title="参保类型" :value="GetInsuranceTypeName(detail.insuranceType)" />
      <van-cell title="岗位" :value="detail.jobDictName" />
      <van-cell title="性别" :value="GetGenderNameByCode(detail.gender)" />
      <van-cell title="出生日期" :value="detail.birthday" />
      <van-cell title="年龄" :value="detail.age != null ? `${detail.age}岁` : ''" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="EmployeeDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetGenderNameByCode, GetInsuranceStateName, GetInsuranceTypeName, GetJobStatusName } from '../employee/employee';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  empNo: '',
  empName: '',
  deptId: <number | null>null,
  deptName: '',
  jobStatus: <number | null>null,
  insuranceType: <number | null>null,
  insuranceState: <number | null>null,
  jobDictId: <number | null>null,
  jobDictName: '',
  jobLevelDictId: <number | null>null,
  jobLevelDictName: '',
  gender: <number | null>null,
  birthday: '',
  age: <number | null>null
});

Api.req('/employee/detail-for-view').query({ id }).success(data => {
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
  name: 'EmployeeInsuranceDetail'
}
</route>
