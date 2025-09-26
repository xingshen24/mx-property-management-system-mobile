<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="form.title" name="title" label="标题" placeholder="请输入请示标题"
          :rules="[{ required: true, message: '请填写请示标题' }]" />
        <van-field v-model="form.content" type="textarea" name="content" label="内容" placeholder="请输入请示内容"
          :rules="[{ required: true, message: '请填写请示内容' }]" />
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


const fileList = ref([])

const form = reactive({
  title: '',
  content: ''
})

const afterRead = (file: any) => {
  uploadFile(file, 'request-for-instruction')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: fileList.value.map(t => t.id)
  }
  Api.req('/request-for-instruction/add-and-submit').json(param).success(() => {
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
  name: 'MyRequestForInstructionForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>