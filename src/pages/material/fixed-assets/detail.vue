<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="物料编号" :value="detail.materialName" />
      <van-cell title="规格编号" :value="detail.specificationName" />
      <van-cell title="固定资产编号" :value="detail.assetsNo" />
      <van-cell title="使用部门" :value="detail.useDeptName" />
      <van-cell title="使用人" :value="detail.useEmpName" />
      <van-cell title="使用日期" :value="detail.useDate" />
      <van-cell title="资金来源" :value="detail.fundingSourceDictName" />
      <van-cell title="原始单价" :value="detail.originalSinglePrice != null ? detail.originalSinglePrice + '元' : ''" />
      <van-cell title="原始总价" :value="detail.originalTotalAmount != null ? detail.originalTotalAmount + '元' : ''" />
      <van-cell title="存放地点" :value="detail.storageLocation" />
      <van-cell title="总数量" :value="detail.totalCount" />
      <van-cell title="供应商" :value="detail.manufacture" />
      <van-cell title="现价单价" :value="detail.currSinglePrice != null ? detail.currSinglePrice + '元' : ''" />
      <van-cell title="现价总价" :value="detail.currTotalAmount != null ? detail.currTotalAmount + '元' : ''" />
      <van-cell title="预期使用年限" :value="detail.expectedUsefulLife" />
      <van-cell title="规格及型号" :value="detail.specification" />
      <van-cell title="报废日期" :value="detail.retirementDate" />
      <van-cell title="说明" :value="detail.inform" />
      <van-cell title="附属设备" :value="detail.ancillaryEquipment" />
    </van-cell-group>
    <div class="data-label data-label-not-top">附件信息</div>
    <file-attachments :files="detail.attachments" />
  </div>
</template>
<script setup lang="ts" name="FixedAssetsDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  materialId: <number | null>null,
  materialName: '',
  specificationId: <number | null>null,
  specificationName: '',
  assetsNo: '',
  useDeptId: <number | null>null,
  useDeptName: '',
  useEmpId: <number | null>null,
  useEmpName: '',
  useDate: '',
  fundingSourceDictId: <number | null>null,
  fundingSourceDictName: '',
  originalSinglePrice: '',
  originalTotalAmount: '',
  storageLocation: '',
  totalCount: '',
  manufacture: '',
  currSinglePrice: '',
  currTotalAmount: '',
  expectedUsefulLife: '',
  specification: '',
  retirementDate: '',
  inform: '',
  ancillaryEquipment: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/fixed-assets/detail-for-view').query({ id }).success(data => {
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
  name: 'FixedAssetsDetail'
}
</route>
