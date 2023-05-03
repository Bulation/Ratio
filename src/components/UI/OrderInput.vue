<script setup lang="ts">
const emit = defineEmits(['input'])
const props = defineProps<{
  type: string,
  placeholder: string,
  isRequired: boolean,
  inputValue: string,
  inputKey: string,
  isError?: boolean,
  errorMessage?: string
}>()

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('input', value, props.inputKey);
}
</script>

<template>
  <div class="order-form-input-wrap">
    <input class="order-form-input" :type="type" :value="inputValue" @input="handleInput" :placeholder="placeholder" :required="isRequired">
    <span class="order-form-error-msg" v-if="isError">{{ errorMessage }}</span>
  </div>
</template>

<style>
  .order-form-input-wrap {
    width: calc(50% - 7px);
  }
  .order-form-input {
    width: 100%;
    color: var(--order-input-color);
    font: 500 14px/20px Montserrat;
    padding: 15px;
    border-bottom: 1px solid #000000;
  }
  .order-form-error-msg {
    color: red;
    font: 700 12px/15px Montserrat;
  }
</style>