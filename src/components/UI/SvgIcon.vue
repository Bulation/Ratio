<script setup lang="ts">

interface ISvgProps {
  className: string,
  id: string
}
defineProps<ISvgProps>();
</script>

<template>
  <svg :class="className">
    <use :href="`/svg/sprite.svg#${id}`" />
  </svg>
</template>