<template>
  <div class="page-wrapper">
    <div class="data-label data-label-top">基础信息</div>
    <van-cell-group inset>
      <van-cell title="归属部门" :value="detail.deptName" />
      <van-cell title="关联员工" :value="detail.affiliateEmpName" />
      <van-cell title="联系人" :value="detail.contactMan" />
      <van-cell title="联系方式">
        <template #default>
          <van-highlight :keywords="detail.contact" :source-string="detail.contact"
            @click="callPhone(detail.contact)" />
        </template>
      </van-cell>
      <van-cell title="备注" :value="detail.remark" />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts" name="AddressBookDetail">
import type { FileAttachment } from '@/components/fileAttachments';
import { callPhone, coverReactive } from '@/utils/common';
import { Api } from '@/utils/request';

const route = useRoute();
const id = route.query.id;

const detail = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  deptName: '',
  affiliateEmpId: <number | null>null,
  affiliateEmpName: '',
  contactMan: '',
  contact: '',
  remark: '',
  attachments: <FileAttachment[]>[]
});

Api.req('/address-book/detail-for-view').query({ id }).success(data => {
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
  name: 'AddressBookDetail'
}
</route>
