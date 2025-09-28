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
      <van-cell title="职务" :value="detail.jobDictName" />
      <van-cell title="职务级别" :value="detail.jobLevelDictName" />
      <van-cell title="员工性别" :value="GetGenderNameByCode(detail.gender)" />
      <van-cell title="身份证" :value="detail.idCard" />
      <van-cell title="出生日期" :value="detail.birthday" />
      <van-cell title="年龄" :value="detail.age" />
      <van-cell title="现居地址" :value="detail.address" />
      <van-cell title="退休时间" :value="detail.retirementTime" />
      <van-cell title="合同类别" :value="GetEmployeeContractTypeName(detail.contractType)" />
      <van-cell title="入职时间" :value="detail.entryTime" />
      <van-cell title="合同期限" :value="GetContractTermTypeName(detail.contractTermType)" />
      <van-cell title="合同开始时间" :value="detail.contractBeginTime" />
      <van-cell title="合同结束时间" :value="contractEndTime(detail.contractEndTime, detail)" />
      <van-cell title="手机号码" :value="detail.phoneNumber" />
      <van-cell title="学历背景" :value="detail.educationalBackgroundDictName" />
      <van-cell title="毕业院校" :value="detail.graduateSchool" />
      <van-cell title="毕业专业" :value="detail.major" />
      <van-cell title="职称/技术等级" :value="detail.title" />
      <van-cell title="已领服装" :value="detail.receiveClothing" />
      <van-cell title="已领工牌" :value="detail.receiveWorkBandage" />
      <van-cell title="首次工作" :value="detail.careerStartDate" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="EmployeeDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetContractTermTypeName, GetEmployeeContractTypeName, GetGenderNameByCode, GetInsuranceStateName, GetInsuranceTypeName, GetJobStatusName } from './employee';

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
  idCard: '',
  birthday: '',
  age: <number | null>null,
  address: '',
  retirementTime: '',
  contractType: <number | null>null,
  entryTime: '',
  contractTermType: <number | null>null,
  contractBeginTime: '',
  contractEndTime: '',
  phoneNumber: '',
  educationalBackgroundDictId: <number | null>null,
  educationalBackgroundDictName: '',
  graduateSchool: '',
  major: '',
  title: '',
  receiveClothing: '',
  receiveWorkBandage: '',
  careerStartDate: '',
  remark: '',
});

Api.req('/employee/detail-for-view').query({ id }).success(data => {
  coverReactive(detail, data);
}).get();

const contractEndTime = (time: string, detail: any) => {
  if (detail.contractTermType == 20) {
    return '无固定期限'
  }
  return time;
}

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
  name: 'EmployeeDetail'
}
</route>
