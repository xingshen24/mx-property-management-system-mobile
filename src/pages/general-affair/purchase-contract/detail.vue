<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="合同编号" :value="detail.contractNo" />
      <van-cell title="合同名称" :value="detail.contractName" />
      <van-cell title="所属部门" :value="detail.belongDeptName" />
      <van-cell title="签订时间" :value="detail.signDate" />
      <van-cell title="合同时间" :value="detail.beginDate + ' ~ ' + detail.endDate" />
      <van-cell title="合同金额" :value="detail.amount" />
      <van-cell title="公司所方" :value="GetCompanySideName(detail.companySide)" />
      <van-cell title="收支类型" :value="GetIncomeExpenditureTypeName(detail.incomeExpenditureType)" />
      <van-cell title="甲方" :value="detail.partA" />
      <van-cell title="乙方" :value="detail.partB" />
      <van-cell title="丙方" :value="detail.partC" />
      <van-cell title="支付类型" :value="GetContractPaymentTypeName(detail.paymentType)" />
      <van-cell title="每期支付金额" :value="detail.paymentPerPeriod" />
      <van-cell title="备注" :value="detail.remark" />
      <van-cell title="支付计划" :value="detail.isMakePlan ? '已建立' : '未建立'" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="ContractDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetCompanySideName, GetContractPaymentTypeName, GetIncomeExpenditureTypeName } from '../contract/contract';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  contractType: <number | null>null,
  contractNo: '',
  contractName: '',
  belongDeptId: <number | null>null,
  belongDeptName: '',
  signDate: '',
  beginDate: '',
  endDate: '',
  amount: '',
  companySide: <number | null>null,
  incomeExpenditureType: <number | null>null,
  partA: '',
  partB: '',
  partC: '',
  paymentType: <number | null>null,
  paymentPerPeriod: '',
  remark: '',
  isMakePlan: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/purchase-contract/detail-for-view').query({ id }).success(data => {
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
  name: 'ContractDetail'
}
</route>
