<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-employee v-model="form.empId" label="申请员工" />
        <van-department v-model="form.deptId" label="所在部门" />
        <van-date-time-field v-model="form.beginTime" label="加班开始时间" />
        <van-date-time-field v-model="form.endTime" label="加班结束时间" />
        <van-field v-model="form.workHours" type="number" name="workHours" label="加班时长" placeholder="请输入加班时长"
          :rules="[needInput('加班时长')]" />
        <van-field v-model="form.reason" type="textarea" name="reason" label="加班原因" placeholder="请输入加班原因"
          :rules="[needInput('加班原因')]" />
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

<script setup lang="ts" name="OvertimeTicketForm">
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { stdFormatDate } from '@/utils/formatTime'
import { needInput } from '@/utils/rules'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  empId: <number | null>null,
  deptId: <number | null>null,
  beginTime: stdFormatDate(new Date()),
  endTime: stdFormatDate(new Date()),
  workHours: <number | null>null,
  reason: '',
})

const afterRead = (file: any) => {
  uploadFile(file, 'overtime-ticket')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  Api.req('/overtime-ticket/add-and-submit').json(param).success(() => {
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
  name: 'OvertimeTicketForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
