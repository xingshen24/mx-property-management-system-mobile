<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-date-field v-model="form.borrowDate" name="borrowDate" label="借阅日期" :rules="[needChoose('借阅日期')]" />
        <van-selector v-model="form.documentType" label="借阅类型" title="请选择借阅类型" :state-object="BorrowDocumentType"
          placeholder="请选择借阅类型" />
        <van-field v-model="form.documentName" name="documentName" label="档案名称" placeholder="请输入档案名称"
          :rules="[needInput('档案名称')]" />
        <van-field v-model="form.purpose" type="textarea" name="purpose" label="借阅目的" placeholder="请输入借阅目的"
          :rules="[{ required: true, message: '请填写借阅目的' }]" />
        <van-department v-model="form.lenderDeptId" label="出借部门" placeholder="请选择出借部门" title="请选择出借部门" />
        <van-employee v-model="form.lenderEmpId" label="出借人" placeholder="请选择出借人" title="请选择出借人" />
        <van-selector v-model="form.borrowType" label="借阅方式" title="请选择借阅方式" :state-object="BorrowDocumentType"
          placeholder="请选择借阅方式" />
        <van-date-field v-model="form.expectReturnDate" name="expectReturnDate" label="归还日期" placeholder="请选择预期归还日期"
          title="请选择预期归还日期" />
        <van-field v-model="form.remark" type="textarea" label="备注" placeholder="请输入备注" />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="fileList" :after-read="afterRead" />
          </template>
        </van-field>
      </van-cell-group>
      <van-button round block type="primary" native-type="submit" style="margin-top: 16px;">提交</van-button>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { BorrowDocumentType } from './borrow'
import { stdFormatToDay } from '@/utils/formatTime'
import { needChoose, needInput } from '@/utils/rules'


const fileList = ref([])

const form = reactive({
  id: <number | null>null,
  borrowDate: stdFormatToDay(new Date()),
  documentName: '',
  documentType: <number | null>null,
  purpose: '',
  borrowerEmpId: <number | null>null,
  borrowerDeptId: <number | null>null,
  lenderEmpId: <number | null>null,
  lenderDeptId: <number | null>null,
  borrowType: <number | null>null,
  pages: <number | null>null,
  expectReturnDate: '',
  remark: '',
})

const afterRead = (file: any) => {
  uploadFile(file, 'document-borrow')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: fileList.value.map(t => t.id)
  }
  Api.req('/document-borrow/add-and-submit').json(param).success(() => {
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
  name: 'MyDocumentBorrowForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>