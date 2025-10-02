<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="部门" :value="detail.deptName" />
      <van-cell title="购买方" :value="detail.buyerName" />
      <van-cell title="开票时间" :value="detail.invoiceTime" />
      <van-cell title="金额" :value="`${detail.amount}元`" />
      <van-cell title="税额" :value="`${detail.tax}元`" />
      <van-cell title="价税合计" :value="`${detail.amountTaxTotal}元`" />
      <van-cell title="已收金额" :value="`${detail.received}元`" />
      <van-cell title="支付情况" :value="GetPaymentStateName(detail.paymentState)" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">已收费用</div>
    <van-cell-group inset>
      <van-cell v-for="item in detail.items" :key="item.id"
        :title="`【${item.payTime?.substring(0, 11)}】${GetFeeTypeName(item.feeType)}`">
        <template #default>
          <van-highlight :keywords="`${item.amount}元`" :source-string="`${item.amount}元`"
            style="--van-highlight-tag-color:var(--van-cell-text-color);" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="InvoiceDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetFeeTypeName, GetPaymentStateName } from './invoice';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  batchId: <number | null>null,
  batchName: '',
  deptId: <number | null>null,
  deptName: '',
  buyerId: <number | null>null,
  buyerName: '',
  invoiceTime: '',
  amount: '',
  tax: '',
  amountTaxTotal: '',
  received: '',
  paymentState: <number | null>null,
  remark: '',
  items: []
});

Api.req('/invoice/detail-for-view').query({ id }).success(data => {
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
  name: 'InvoiceDetail'
}
</route>
