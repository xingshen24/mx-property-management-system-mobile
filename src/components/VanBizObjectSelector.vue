<template>
  <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholderText" @click="show = true" />
  <van-popup v-model:show="show" round position="bottom">
    <van-picker :title="titleText" :columns="columns" :columns-field-names="columnsFieldNames" @confirm="onConfirm"
      @cancel="onCancel" @change="onChange" />
  </van-popup>
</template>
<script lang="ts" setup>

const emits = defineEmits(['update:modelValue'])

const columnsFieldNames = { text: 'name', value: 'id', children: 'children' }

interface BizObject {
  id: string;
  name: string;
}

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  objectsLoader: {
    type: Function,
    default: (_fn: (objs: BizObject[]) => void) => <BizObject[]>[]
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

const columns = ref([])
props.objectsLoader((objects: any[]) => columns.value = objects);

const onConfirm = ({ selectedOptions }) => {
  const selected = selectedOptions[0]
  fieldValue.value = selected.name;
  emits('update:modelValue', selected.id)
  show.value = false;
}

const onCancel = () => {
  show.value = false;
}

const onChange = () => {

}
</script>