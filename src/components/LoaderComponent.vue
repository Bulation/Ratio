<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ElSkeleton } from 'element-plus'

const isLoading = ref(true)

watchEffect(() => {
  if (props.data) {
    isLoading.value = false
  }
})

const props = defineProps<{
  data: any
  count?: number
}>();
</script>

<template>
  <ElSkeleton :style="'position: relative'" :loading="isLoading" animated :count="count">
    <template #template>
      <slot name="template"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
  </ElSkeleton>
</template>