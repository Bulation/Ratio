<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
interface IMarketBlockProps {
  path: string
  iconClass: string
  iconId: string
  marketName: string
}
defineProps<IMarketBlockProps>()
</script>

<template>
  <a :href="path" class="market">
    <SvgIcon :className="iconClass" :id="iconId" />
    <span class="market__name"> {{ marketName }}</span>
  </a>
</template>

<style scoped lang="scss">
.market {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  gap: 15px;
  border-radius: 6px;
  background-color: var(--market-bg);
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: var(--btn-bg);
  }
  &__name {
    color: var(--main-text-color);
    font: 600 15px/18px Montserrat;
  }
  &__icon {
    width: 22px;
    height: 22px;
  }
}
</style>
