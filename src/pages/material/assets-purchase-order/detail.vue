<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="编号" :value="detail.orderNo" />
      <van-cell title="仓库" :value="detail.warehouseName" />
      <van-cell title="调拨仓库" v-if="detail.transfer" :value="detail.transferWarehouseName" />
      <van-cell title="申请部门" :value="detail.applyDeptName" />
      <van-cell title="申请用户" :value="detail.applyEmpName" />
      <van-cell title="申请日期" :value="detail.applyDate" />
      <van-cell title="用途" :value="detail.purpose" />
      <van-cell title="申请原因" :value="detail.reason" />
      <van-cell title="评估意见" :value="detail.assessment" />
      <van-cell title="总计金额" :value="detail.totalAmount + '元'" />
      <van-cell title="总计条目数" :value="detail.totalItem + '条'" />
      <van-cell title="总件数" :value="detail.totalCount + '件'" />
      <van-cell title="审批状态" :value="GetGeneralProcessStateName(detail.approvalState)" />
      <van-cell title="验收状态" :value="GetPurchaseOrderAcceptStateName(detail.acceptState)" />
      <van-cell title="验收单" v-if="detail.acceptanceOrderNo != null" :value="detail.acceptanceOrderNo" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">明细</div>
    <van-cell-group inset>
      <van-cell v-for="item in detail.items" :key="item.id" :title="item.materialName + ' - ' + item.specificationName">
        <template #default>
          <van-highlight :keywords="formatItem(item)" :source-string="formatItem(item)"
            style="--van-highlight-tag-color:var(--van-cell-text-color);" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="AssetsPurchaseOrderDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetPurchaseOrderAcceptStateName, type PurchaseOrderItem } from '../purchase-order/purchase';
import { GetGeneralProcessStateName } from '@/pages/approval/approval';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  intentionId: <number | null>null,
  intentionName: '',
  orderNo: '',
  warehouseId: <number | null>null,
  warehouseName: '',
  isAssets: '',
  transfer: '',
  transferWarehouseId: <number | null>null,
  transferWarehouseName: '',
  applyDeptId: <number | null>null,
  applyDeptName: '',
  applyEmpId: <number | null>null,
  applyEmpName: '',
  applyDate: '',
  purpose: '',
  totalAmount: '',
  totalItem: <number | null>null,
  totalCount: '',
  approvalState: <number | null>null,
  acceptState: <number | null>null,
  acceptanceOrderId: <number | null>null,
  acceptanceOrderNo: '',
  remark: '',
  items: <PurchaseOrderItem[]>[],
  reason: '',
  assessment: '',
  attachments: <FileAttachment[]>[]
});

const formatItem = (item: PurchaseOrderItem) => {
  if (item.totalAmount != null) {
    return `${item.number}${item.unit}共计${item.totalAmount}元`
  } else {
    return `${item.number}${item.unit}`
  }
}

Api.req('/assets-purchase-order/detail-for-view').query({ id }).success(data => {
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
  name: 'AssetsPurchaseOrderDetail'
}
</route>
