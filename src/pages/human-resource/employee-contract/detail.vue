<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="合同名称" :value="detail.name"/>
      <van-cell title="归属部门" :value="detail.belongDeptName" />     
      <van-cell title="员工" :value="detail.empName" />     
      <van-cell title="合同责任人" :value="detail.responsibleEmpName" />     
      <van-cell title="甲方" :value="detail.partA"/>
      <van-cell title="乙方" :value="detail.partB"/>
      <van-cell title="丙方" :value="detail.partC"/>
      <van-cell title="合同金额" :value="detail.amount"/>
      <van-cell title="合同开始时间" :value="detail.beginDate"/>
      <van-cell title="合同结束时间" :value="detail.endDate"/>
      <van-cell title="合同备注" :value="detail.remark"/>
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="EmployeeContractDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  name: '',
  responsibleEmpId: <number|null>null,
  responsibleEmpName: '',
  belongDeptId: <number|null>null,
  belongDeptName: '',
  empId: <number|null>null,
  empName: '',
  partA: '',
  partB: '',
  partC: '',
  amount: '',
  beginDate: '',
  endDate: '',
  remark: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/employee-contract/detail-for-view').query({ id }).success(data => {
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
  name: 'EmployeeContractDetail'
}
</route>
