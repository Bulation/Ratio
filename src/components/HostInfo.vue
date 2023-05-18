<script setup lang="ts">
import convertArrayPriceToString from '@/helperFunctions/convertArrayPriceToString'

interface IHostInfoProps {
  avatar: string
  name: string
  price: string[]
}
defineProps<IHostInfoProps>()
</script>

<template>
  <div class="host-info">
                <img class="host-info__img" :src="avatar" alt="Avatar">
                <div class="host-description">
                  <p class="host-description__listed">Listed by:</p>
                  <h4 class="host-description__host-name">{{ name }}</h4>
                  <p class="host-description__price">For: {{ convertArrayPriceToString(price) }}</p>
                </div>
              </div>
</template>

<style scoped lang="scss">
.host-info {
    display: flex;
    gap: 21px;
    &__img {
      width: 76px;
      height: 76px;
      border-radius: 50%;
    }
  }
.host-description {
  color: var(--main-text-color);
  &__listed {
    font: 500 12px/15px Montserrat;
  }
  &__host-name {
    font: 700 18px/22px Montserrat;
  }
  &__price {
    font: 500 16px/20px Montserrat;
  }
}
</style>