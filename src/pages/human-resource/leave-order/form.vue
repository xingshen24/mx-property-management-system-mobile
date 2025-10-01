<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-employee v-model="form.empId" label="申请员工" />
        <van-department v-model="form.deptId" label="所在部门" />
        <van-date-time-field v-model="form.beginTime" label="请假开始时间" />
        <van-date-time-field v-model="form.endTime" label="请假结束时间" />
        <van-selector v-model="form.leaveType" label="请假种类" :state-object="LeaveType" />
        <van-field v-model="form.weekdays" type="number" name="weekdays" label="工作日数" placeholder="请输入工作日数"
          :rules="[needInput('工作日数')]" />
        <van-field v-model="form.reason" type="textarea" name="reason" label="事由" placeholder="请输入请假的事由"
          :rules="[needInput('请假的事由')]" />
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

<script setup lang="ts" name="LeaveOrderForm">
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { extendSeconds, stdFormatDate } from '@/utils/formatTime'
import { needInput } from '@/utils/rules'
import { LeaveType } from './leaveOrder'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  empId: <number | null>null,
  deptId: <number | null>null,
  beginTime: stdFormatDate(new Date()),
  endTime: stdFormatDate(new Date()),
  weekdays: <number | null>null,
  leaveType: <number | null>null,
  reason: '',
})

const afterRead = (file: any) => {
  uploadFile(file, 'leave-order')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  extendSeconds(param.beginTime)
  extendSeconds(param.endTime)
  Api.req('/leave-order/add-and-submit').json(param).success(() => {
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
  name: 'LeaveOrderForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
