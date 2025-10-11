<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="编号" :value="detail.orderNo" />
      <van-cell title="类型" :value="GetDeliveryOrderTypeName(detail.orderType)" />
      <van-cell title="仓库" :value="detail.warehouseName" />
      <van-cell title="出货总条目" :value="detail.totalItem + '条'" />
      <van-cell title="总件数" :value="detail.totalCount + '件'" />
      <van-cell title="发起人" :value="detail.promptEmpName" />
      <van-cell title="状态" :value="GetDeliveryOrderStateName(detail.orderState)" />
      <van-cell title="出库时间" :value="detail.deliverTime" />
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
    <div class="data-label data-label-not-top">入库单明细</div>
    <van-cell-group inset>
      <van-cell v-for="item in detail.items" :key="item.id" :title="item.materialName + ' - ' + item.specificationName">
        <template #default>
          <van-highlight :keywords="formatItem(item)" :source-string="formatItem(item)"
            style="--van-highlight-tag-color:var(--van-cell-text-color);" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="DeliveryOrderDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';
import { GetDeliveryOrderStateName, GetDeliveryOrderTypeName } from './delivery';

interface DeliveryItem {
  id: number;
  orderId: number;
  orderNo: string;
  materialId: number;
  materialName: string;
  specificationId: number;
  specificationName: string;
  unit: string;
  number: number;
  hasList: boolean;
  remark: string;
}

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  orderNo: '',
  orderType: <number | null>null,
  warehouseId: <number | null>null,
  warehouseName: '',
  totalItem: <number | null>null,
  totalCount: '',
  promptEmpId: <number | null>null,
  promptEmpName: '',
  orderState: <number | null>null,
  deliverTime: '',
  remark: '',
  items: <DeliveryItem[]>[]
});

const formatItem = (item: DeliveryItem) => {
  return `${item.number}${item.unit}`
}

Api.req('/delivery-order/detail-for-view').query({ id }).success(data => {
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
  name: 'DeliveryOrderDetail'
}
</route>
