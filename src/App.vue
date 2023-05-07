<script setup lang="ts">
import PageHeader from '@/layout/PageHeader.vue'
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
    <template v-slot:description="{ content }">{{ content.description }}</template>
    <template v-slot:keywords="{ content }">{{ content }}</template>
    <template v-slot:og(title)="{ content }">
      {{ content }}
    </template>
    <template v-slot:og(description)="{ content }">
      {{ content }}
    </template>
  </metainfo>
  <PageHeader />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
