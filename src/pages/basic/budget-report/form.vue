<template>
  <div class="page-wrapper">
    <van-form>
      <van-cell-group inset>
        <van-employee v-model="empId" />
      </van-cell-group>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
const empId = ref<number>();
</script>
<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>