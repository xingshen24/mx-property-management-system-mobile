<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">库存明细</div>
    <van-cell-group inset>
      <van-cell title="仓库名称" :value="detail.warehouseName" />
      <van-cell title="物料名称" :value="detail.materialName" />
      <van-cell title="规格名称" :value="detail.specificationName" />
      <van-cell title="总库存" :value="detail.totalInventory + detail.unit" />
      <van-cell title="已锁定库存" :value="detail.lockInventory + detail.unit" />
      <van-cell title="可用库存" :value="detail.availableInventory + detail.unit" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="InventoryDetail">
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  warehouseId: <number | null>null,
  warehouseName: '',
  materialId: <number | null>null,
  materialName: '',
  specificationId: <number | null>null,
  specificationName: '',
  unit: '',
  totalInventory: '',
  lockInventory: '',
  availableInventory: '',
});

Api.req('/inventory/detail-for-view').query({ id }).success(data => {
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
  name: 'InventoryDetail'
}
</route>
