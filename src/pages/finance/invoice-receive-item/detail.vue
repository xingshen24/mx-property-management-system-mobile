<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="部门" :value="detail.deptName" />
      <van-cell title="购买方" :value="detail.buyerName" />
      <van-cell title="费用类型" :value="GetFeeTypeName(detail.feeType)" />
      <van-cell title="收入金额" :value="`${detail.amount}元`" />
      <van-cell title="支付时间" :value="detail.payTime?.substring(0, 10)" />
      <van-cell title="发票总金额" :value="`${detail.invoiceAmountTaxTotal}元`" />
      <van-cell title="开票时间" :value="detail.invoiceTime" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="InvoiceReceiveItemDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetFeeTypeName } from '../invoice/invoice';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  invoiceId: <number | null>null,
  deptName: '',
  buyerId: <number | null>null,
  buyerName: '',
  feeType: <number | null>null,
  amount: '',
  invoiceAmountTaxTotal: <number | null>null,
  invoiceTime: '',
  payTime: '',
  remark: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/invoice-receive-item/detail-for-view').query({ id }).success(data => {
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
  name: 'InvoiceReceiveItemDetail'
}
</route>
