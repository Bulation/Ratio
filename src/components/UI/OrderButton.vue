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
  color: var(--light-color);
  background-color: var(--button-color);
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: var(--second-text-color);
  }
  &:disabled {
    background-color: var(--disabled-color);
  }
  @media screen and (max-width: 420px) {
    width: 210px;
  }
}
</style>
