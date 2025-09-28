<template>
  <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText" @click="show = true" />
  <van-popup v-model:show="show" round position="bottom">
    <van-cascader v-model="cascaderValue" :title="titleText" :options="options" @close="show = false" @change="onChange"
      @finish="onFinish" />
  </van-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { closeToast, showLoadingToast } from 'vant';
import { loadDeptEmp } from './employee';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  label: {
    type: String,
    default: '员工'
  },
  placeholder: {
    type: String,
    default: '请选择员工'
  },
  title: {
    type: String,
    default: '请选择员工'
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
const cascaderValue = ref('');
const options = ref([]);

const onChange = ({ value, tabIndex, selectedOptions }) => {
  const node = selectedOptions[tabIndex];
  if (!node.leaf) {
    showLoadingToast('加载中...');
    loadDeptEmp(value.replace('dept-', ''), (data) => {
      selectedOptions[tabIndex].children = data;
    }, closeToast)
  }
};
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  let titleArr = selectedOptions.map((option) => option.text);
  const titleLen = titleArr.length;
  if (titleLen > 2) {
    fieldValue.value = `${titleArr[titleLen - 2]}/${titleArr[titleLen - 1]}`
  } else {
    fieldValue.value = titleArr.join('/');
  }
  const length = selectedOptions.length;
  const last = selectedOptions[length - 1];
  emits('update:modelValue', Number.parseInt(last.value))
};

onMounted(() => {
  loadDeptEmp(1, (data) => options.value = data)
})

</script>