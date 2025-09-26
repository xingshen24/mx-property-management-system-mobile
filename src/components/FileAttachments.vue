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
</script>

<template>
  <van-cell-group inset>
    <van-cell
      v-for="(file, index) in files" :key="index" :title="file.name" :icon="getFileIcon(file.fileType)" is-link
      @click="handleFileClick(file)"
    />
  </van-cell-group>
</template>
