<template>
  <van-field v-model="fieldValue" is-link readonly :label="label" :placeholder="placeholder" @click="show = true" />
  <van-popup v-model:show="show" round position="bottom">
    <van-cascader v-model="cascaderValue" :title="title" :options="options" @close="show = false" @change="onChange"
      @finish="onFinish" />
  </van-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { loadDeptTree } from '@/utils/department';

const emits = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  label: {
    type: String,
    default: '部门'
  },
  placeholder: {
    type: String,
    default: '请选择部门'
  },
  title: {
    type: String,
    default: '请选择部门'
  }
})

const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const options = ref([]);

const setDisplayText = (tree: any) => {
  tree.text = tree.deptName;
  tree.value = tree.id;
  const children = tree.children ?? [];
  for (const child of children) {
    setDisplayText(child);
  }
}

loadDeptTree((deptTree) => {
  deptTree = deptTree ?? [];
  for (const node of deptTree) {
    setDisplayText(node);
  }
  options.value = deptTree;
  console.log(options)
})

const onChange = ({ }) => {

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

</script>