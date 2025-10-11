<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="物料名称" :value="detail.materialName" />
      <van-cell title="规格名称" :value="detail.name" />
      <van-cell title="类别" :value="detail.categoryDictName" />
      <van-cell title="商品单位" :value="detail.unit" />
      <van-cell title="商品单价" :value="detail.price != null ? detail.price + '元' : ''" />
      <van-cell title="产品规格" :value="detail.specification" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="MaterialSpecificationDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  materialId: <number | null>null,
  materialName: '',
  categoryDictId: <number | null>null,
  categoryDictName: '',
  name: '',
  unit: '',
  price: '',
  specification: '',
  sortNo: <number | null>null,
  attachments: <FileAttachment[]>[]
});

Api.req('/material-specification/detail-for-view').query({ id }).success(data => {
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
  name: 'MaterialSpecificationDetail'
}
</route>
