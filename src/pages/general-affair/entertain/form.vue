<template>
  <div class="page-wrapper">
    <van-form @submit="onSubmit" :model="form">
      <van-cell-group inset>
        <van-department v-model="form.deptId" label="接待部门" />
        <van-date-time-field v-model="form.entertainTime" label="接待时间" />
        <van-field v-model="form.visitor" name="visitor" label="来访单位及来访人" placeholder="请输入来访单位及来访人"
          :rules="[needInput('来访单位及来访人')]" />
        <van-field v-model="form.visitorNumber" type="number" name="visitorNumber" label="来访人数" placeholder="请输入来访人数"
          :rules="[needInput('来访人数')]" />
        <van-field v-model="form.matter" name="matter" label="事由" placeholder="请输入事由" :rules="[needInput('事由')]" />
        <van-field v-model="form.content" name="content" label="内容" placeholder="请输入内容" :rules="[needInput('内容')]" />
        <van-field v-model="form.dinnerNumber" type="number" name="dinnerNumber" label="用餐人数（含陪同）"
          placeholder="请输入用餐人数（含陪同）" :rules="[needInput('用餐人数（含陪同）')]" />
        <van-field v-model="form.dinnerLocation" name="dinnerLocation" label="用餐地点" placeholder="请输入用餐地点"
          :rules="[needInput('用餐地点')]" />
        <van-dict v-model="form.dinnerTypeDictId" category="entertain_dinner_type" label="餐别" />
        <van-field v-model="form.dinnerEstimatedCost" type="number" name="dinnerEstimatedCost" label="预估餐费（元）"
          placeholder="请输入预估餐费（元）" :rules="[needInput('预估餐费（元）')]" />
        <van-field v-model="form.stayLocation" name="stayLocation" label="住宿地点" placeholder="请输入住宿地点"
          :rules="[needInput('住宿地点')]" />
        <van-date-time-field v-model="form.stayTime" label="入住时间" />
        <van-field v-model="form.roomNumber" type="number" name="roomNumber" label="房间数" placeholder="请输入房间数"
          :rules="[needInput('房间数')]" />
        <van-field v-model="form.roomEstimatedCost" type="number" name="roomEstimatedCost" label="预计住宿费（元）"
          placeholder="请输入预计住宿费（元）" :rules="[needInput('预计住宿费（元）')]" />
        <van-cell title="总费用" :value="form.totalCost != null && !isNaN(form.totalCost) ? `${form.totalCost}元` : ''" />
        <van-employee v-model="form.operatorEmpId" label="经办人" />
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

<script setup lang="ts" name="EntertainForm">
import { Api } from '@/utils/request'
import { uploadFile } from '@/utils/uploader'
import { showDialog } from 'vant'
import { stdFormatDate } from '@/utils/formatTime'
import { needInput } from '@/utils/rules'

const files = ref([])

const form = reactive({
  id: <number | null>null,
  deptId: <number | null>null,
  entertainTime: stdFormatDate(new Date()),
  visitor: '',
  visitorNumber: <number | null>null,
  matter: '',
  content: '',
  dinnerNumber: <number | null>null,
  dinnerLocation: '',
  dinnerTypeDictId: <number | null>null,
  dinnerEstimatedCost: '',
  stayLocation: '',
  stayTime: stdFormatDate(new Date()),
  roomNumber: <number | null>null,
  roomEstimatedCost: '',
  totalCost: <number | null>null,
  operatorEmpId: <number | null>null,
})

const calcTotalCost = () => {
  if (form.dinnerEstimatedCost == null || form.roomEstimatedCost == null) {
    form.totalCost = null;
    return;
  }
  const dinnerCost = typeof form.dinnerEstimatedCost == 'number' ? form.dinnerEstimatedCost : Number.parseFloat(form.dinnerEstimatedCost);
  const roomCost = typeof form.roomEstimatedCost == 'number' ? form.roomEstimatedCost : Number.parseFloat(form.roomEstimatedCost);
  form.totalCost = dinnerCost + roomCost;
}

watch(() => form.dinnerEstimatedCost, () => {
  calcTotalCost();
})

watch(() => form.roomEstimatedCost, () => {
  calcTotalCost();
})

const afterRead = (file: any) => {
  uploadFile(file, 'entertain')
}

const router = useRouter();

const onSubmit = () => {
  const param = {
    ...form,
    attachmentIds: files.value.map(t => t.id)
  }
  Api.req('/entertain/add-and-submit').json(param).success(() => {
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
  name: 'EntertainForm'
}
</route>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
