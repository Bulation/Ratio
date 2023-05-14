<script setup lang="ts">
import PageHeader from '@/layout/PageHeader.vue'
import { onErrorCaptured, ref } from 'vue';
import ErrorComponent from './components/ErrorComponent.vue';
const error = ref(null);

onErrorCaptured(() => {
  error.value = true;
});
</script>

<template>
  <div v-if="error">
    <ErrorComponent />
  </div>
  <PageHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <Component :is="Component" />
    </keep-alive>
  </router-view>
</template>
