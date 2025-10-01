<template>
  <div>
    <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText"
      @click="openSelector" />
    <van-popup v-model:show="showDate" round position="bottom">
      <van-date-picker v-model="currentDate" :title="titleText" :min-date="minDate" :max-date="maxDate"
        @confirm="confirmDate" @cancel="onCancel" @change="onChange" />
    </van-popup>
    <van-popup v-model:show="showTime" round position="bottom">
      <van-time-picker v-model="currentTime" :title="titleText" :min-time="minTime" :max-time="maxTime"
        @confirm="confirmTime" @cancel="onCancel" @change="onChange" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { timeToDate } from '@/utils/formatTime';

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  stateObject: {
    type: Object,
    default: {}
  },
  title: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '',
  }
})

const placeholderText = computed(() => {
  if (props.placeholder != null && props.placeholder != '') {
    return props.placeholder;
  }
  return `请选择${props.label}`
})

const titleText = computed(() => {
  if (props.title != null && props.title != '') {
    return props.title;
  }
  return `请选择${props.label}`
})

const showDate = ref(false);
const showTime = ref(false);

const fieldValue = ref('');
const currentDate = ref(['', '', '']);
const currentTime = ref(['', ''])

const formatCurrentDate = () => {
  const date = currentDate.value;
  const time = currentTime.value;
  return `${date[0]}-${date[1]}-${date[2]} ${time[0]}:${time[1]}`;
}

const formatTo2Digit = (number: number) => {
  return number < 10 ? `0${number}` : `${number}`
}

const modelValue = props.modelValue;
if (modelValue != null && modelValue.indexOf('-') != -1) {
  const time = timeToDate(modelValue)
  const dateArr = currentDate.value;
  const timeArr = currentTime.value;
  dateArr[0] = `${time.getFullYear()}`
  dateArr[1] = `${formatTo2Digit(time.getMonth() + 1)}`
  dateArr[2] = `${formatTo2Digit(time.getDate() + 1)}`
  timeArr[0] = `${formatTo2Digit(time.getHours())}`
  timeArr[1] = `${formatTo2Digit(time.getMinutes())}`
  fieldValue.value = formatCurrentDate();
}

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2099, 11, 31)
const minTime = "00:00:00";
const maxTime = "23:59:59";

const openSelector = () => {
  if (modelValue == '' || modelValue == null) {
    const date = new Date();
    currentDate.value[0] = `${date.getFullYear()}`
    currentDate.value[1] = `${date.getMonth() + 1}`
    currentDate.value[2] = `${date.getDate()}`
    currentTime.value[0] = `${date.getHours()}`
    currentTime.value[1] = `${date.getMinutes()}`
  }
  showDate.value = true;
}

const confirmDate = () => {
  showDate.value = false;
  showTime.value = true;
}

const confirmTime = () => {
  fieldValue.value = formatCurrentDate();
  emits('update:modelValue', formatCurrentDate())
  showTime.value = false;
}

const onCancel = () => {
  showDate.value = false;
  showTime.value = false;
}

const onChange = () => {

}
</script>