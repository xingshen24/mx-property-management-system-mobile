<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-department v-model="form.deptId" label="接待部门" />
        <van-date-time-field v-model="form.mealTime" label="接待时间" />
        <van-field v-model="form.reason" type="textarea" name="reason" label="接待事由" placeholder="请输入接待事由"
          :rules="[needInput('接待事由')]" />
        <van-field v-model="form.diningLocation" name="diningLocation" label="用餐地点" placeholder="请输入用餐地点"
          :rules="[needInput('用餐地点')]" />
        <van-field v-model="form.diningNum" type="number" name="diningNum" label="用餐人数" placeholder="请输入用餐人数"
          :rules="[needInput('用餐人数')]" />
        <van-employee v-model="form.operatorEmpId" label="经办人" />
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

<script setup lang="ts" name="MealExpenseForm">
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { stdFormatDate } from '@/utils/formatTime'
import { needInput } from '@/utils/rules'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  mealTime: stdFormatDate(new Date()),
  reason: '',
  diningLocation: '',
  diningNum: <number | null>null,
  operatorEmpId: <number | null>null,
  remark: '',
})

const afterRead = (file: any) => {
  uploadFile(file, 'meal-expense')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  Api.req('/meal-expense/add-and-submit').json(param).success(() => {
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
  name: 'MealExpenseForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
