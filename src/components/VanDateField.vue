<template>
  <div>
    <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText"
      @click="openSelector" />
    <van-popup v-model:show="show" round position="bottom">
      <van-date-picker v-model="currentDate" :title="titleText" :min-date="minDate" :max-date="maxDate"
        @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
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

const show = ref(false);
const fieldValue = ref('');
const currentDate = ref(['', '', '']);

const formatCurrentDate = () => {
  return `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]}`;
}

const modelValue = props.modelValue;
if (modelValue != null && modelValue.indexOf('-') != -1) {
  const date = timeToDate(modelValue)
  currentDate.value[0] = `${date.getFullYear()}`
  currentDate.value[1] = `${date.getMonth() + 1}`
  currentDate.value[2] = `${date.getDate()}`
  fieldValue.value = formatCurrentDate();
}

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2099, 11, 31)

const openSelector = () => {
  if (modelValue == '' || modelValue == null) {
    const date = new Date();
    currentDate.value[0] = `${date.getFullYear()}`
    currentDate.value[1] = `${date.getMonth() + 1}`
    currentDate.value[2] = `${date.getDate()}`
  }
  show.value = true;
}

const onConfirm = () => {
  fieldValue.value = formatCurrentDate();
  emits('update:modelValue', formatCurrentDate())
  show.value = false;
}

const onCancel = () => {
  show.value = false;
}

const onChange = () => {

}
</script>