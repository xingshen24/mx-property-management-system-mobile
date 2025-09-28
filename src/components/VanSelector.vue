<template>
  <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText" @click="show = true" />
  <van-popup v-model:show="show" round position="bottom">
    <van-picker :title="titleText" :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
  </van-popup>
</template>
<script lang="ts" setup>

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number,
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

const columns = computed(() => {
  if (props.stateObject == null) {
    return []
  }
  const columns = []
  for (const entry of Object.entries(props.stateObject)) {
    const value = entry[1];
    columns.push({
      text: value.name,
      value: value.code
    })
  }
  return columns;
})

const onConfirm = ({ selectedOptions }) => {
  const selected = selectedOptions[0]
  fieldValue.value = selected.text;
  emits('update:modelValue', selected.value)
  show.value = false;
}

const onCancel = () => {
  show.value = false;
}

const onChange = () => {

}
</script>