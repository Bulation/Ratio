<script setup lang="ts">
import PageHeader from '@/layout/PageHeader.vue'
</script>

<template>
  <PageHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
