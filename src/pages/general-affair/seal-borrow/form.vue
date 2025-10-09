<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-biz-object-selector v-model="form.sealId" name="sealId" label="用章" placeholder="请选择用章"
          :objects-loader="loadSeals" :rules="[needInput('用章')]" />
        <van-employee v-model="form.borrowEmpId" label="借阅人" />
        <van-date-time-field v-model="form.borrowTime" label="借出时间" />
        <van-date-time-field v-model="form.expectedReturnTime" label="预计归还时间" />
        <van-field v-model="form.reason" type="textarea" name="reason" label="借出事由" placeholder="请输入借出事由"
          :rules="[needInput('借出事由')]" />
        <van-field v-model="form.remark" type="textarea" name="remark" label="备注" placeholder="请输入备注"
          :rules="[needInput('备注')]" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="files" :after-read="afterRead" />
          </template>
        </van-field>
      </van-cell-group>
      <van-button round block type="primary" native-type="submit" style="margin-top: 16px;">提交</van-button>
    </van-form>
  </div>
</template>

<script setup lang="ts" name="SealBorrowForm">
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { stdFormatDate } from '@/utils/formatTime'
import { needInput } from '@/utils/rules'
import { loadSeals } from './seal'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  sealId: <number | null>null,
  borrowEmpId: <number | null>null,
  borrowTime: stdFormatDate(new Date()),
  expectedReturnTime: stdFormatDate(new Date()),
  reason: '',
  remark: '',
})

const afterRead = (file: any) => {
  uploadFile(file, 'seal-borrow')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  Api.req('/seal-borrow/add-and-submit').json(param).success(() => {
    showDialog({
      message: '您已成功提交请求！',
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
  name: 'SealBorrowForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
