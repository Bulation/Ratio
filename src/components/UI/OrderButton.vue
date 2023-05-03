<script setup lang="ts">
defineProps<{
  isDisabled: boolean
}>()
</script>

<template>
  <button :disabled="isDisabled" class="order-btn" type="submit"><slot></slot></button>
</template>

<style lang="scss">
  .order-btn {
    font: 700 15px/18px Montserrat;
    width: 324px;
    padding: 22px 0;
    border-radius: 30px;
    color: #FFFFFF;
    background-color: var(--button-color);
    cursor: pointer;
    &:disabled {
      background-color: grey;
    }
  }
</style>