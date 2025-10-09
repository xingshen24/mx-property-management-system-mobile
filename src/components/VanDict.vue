<template>
  <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText" @click="show = true" />
  <van-popup v-model:show="show" round position="bottom">
    <van-picker :title="titleText" :columns="columns" :columns-field-names="columnsFieldNames" @confirm="onConfirm"
      @cancel="onCancel" @change="onChange" />
  </van-popup>
</template>
<script lang="ts" setup>
import { loadDictOption } from './dictionary';

const emits = defineEmits(['update:modelValue'])

const columnsFieldNames = { text: 'dictName', value: 'id', children: 'NO_CHILDREN' }

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    default: ''
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

if (props.category == null || props.category == '') {
  throw new Error("categoryCode不可以为空！");
}

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

const columns = ref([])
loadDictOption(props.category, (objects: any[]) => columns.value = objects);

const onConfirm = ({ selectedOptions }) => {
  const selected = selectedOptions[0]
  fieldValue.value = selected.dictName;
  emits('update:modelValue', selected.id)
  show.value = false;
}

const onCancel = () => {
  show.value = false;
}

const onChange = () => {

}
</script>