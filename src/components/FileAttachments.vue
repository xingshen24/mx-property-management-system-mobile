<script lang="ts" setup>
import type { FileAttachment } from './fileAttachments'

defineProps({
  files: {
    type: Array<FileAttachment>,
    default: () => [],
  },
})

function getFileIcon(type) {
  const iconMap = {
    pdf: 'description',
    excel: 'notes',
    ppt: 'orders-o',
    word: 'edit',
    image: 'photograph',
    video: 'video-o',
    audio: 'music-o',
  }
  return iconMap[type] || 'file-o'
}
function handleFileClick(file) {
  // 文件预览或打开逻辑
  this.previewFile(file)
}
function downloadFile(file) {
  // 下载逻辑
  console.log('下载文件:', file.name)
}
function previewFile(file) {
  // 根据文件类型进行预览
  if (file.type === 'pdf') {
    this.previewPDF(file)
  }
  else if (file.type === 'image') {
    this.previewImage(file)
  }
  else {
    this.downloadFile(file)
  }
}
</script>

<template>
  <van-cell-group inset>
    <van-cell
      v-for="(file, index) in files" :key="index" :title="file.name" :icon="getFileIcon(file.fileType)" is-link
      @click="handleFileClick(file)"
    />
  </van-cell-group>
</template>
