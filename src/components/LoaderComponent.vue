<script setup lang="ts">
// компонент для рендера скелетона из element-plus
import { ref, watchEffect } from 'vue';
import { ElSkeleton } from 'element-plus'

interface ILoaderProps {
  data: any
  count?: number
}

const isLoading = ref(true)

watchEffect(() => {
  if (typeof props.data === "object" && props.data !== null && props.data.length) { // обработка массивов
    isLoading.value = false;
  } else if (typeof props.data !== "object" && props.data) { // обработка примитивов
    isLoading.value = false;
  } else if (typeof props.data === "object" && props.data !== null && Object.keys(props.data).length) { // обработка объектов
    isLoading.value = false;
  } else {
    isLoading.value = true;
  }
})

const props = defineProps<ILoaderProps>();
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