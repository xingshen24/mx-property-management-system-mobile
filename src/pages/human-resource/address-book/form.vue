<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-department v-model="form.deptId" label="归属部门" />
        <van-employee v-model="form.affiliateEmpId" label="关联员工" />
        <van-field v-model="form.contactMan" name="contactMan" label="联系人" placeholder="请输入联系人"
          :rules="[needInput('联系人')]" />
        <van-field v-model="form.contact" name="contact" label="联系方式" placeholder="请输入联系方式"
          :rules="[needInput('联系方式')]" />
        <van-field v-model="form.remark" type="textarea" name="remark" label="备注" placeholder="请输入备注"
          :rules="[needInput('备注')]" />
      </van-cell-group>
      <van-button round block type="primary" native-type="submit" style="margin-top: 16px;">提交</van-button>
    </van-form>
  </div>
</template>

<script setup lang="ts" name="AddressBookForm">
import { Api } from '@/utils/request'
import { showDialog } from 'vant'
import { needInput } from '@/utils/rules'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  affiliateEmpId: <number | null>null,
  contactMan: '',
  contact: '',
  remark: '',
})

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  Api.req('/address-book/add').json(param).success(() => {
    showDialog({
      message: '您已成功添加通讯录！',
      theme: 'round-button',
      confirmButtonColor: '#07C160'
    }).then(() => {
      router.back();
    });
  }).post();
}
</script>
<route lang="json5">
{
  name: 'AddressBookForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
