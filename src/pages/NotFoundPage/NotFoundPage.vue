<script setup lang="ts">
import { useHead } from 'unhead'
useHead({
  title: "404 not found",
  meta: [
    { name: 'description', content: "Page is not found" },
    { name: 'keywords', content: "hotels, not found" },
    { property: 'og:title', content: "404 not found"},
    { property: 'og:description', content: "Page is not found"},
  ]
})
</script>

<template>
  <div>Page not found. <router-link to="/">Home Page</router-link></div>
</template>