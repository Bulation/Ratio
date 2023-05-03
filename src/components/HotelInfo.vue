<script setup lang="ts">

interface IHotelInfoProps {
  name: string,
  address: string,
}
defineProps<IHotelInfoProps>()
</script>

<template>
  <div class="hotel-info">
    <h4 class="hotel-info__title">{{ name }}</h4>
    <address class="hotel-info__address">{{ address }}</address>
  </div>
  
</template>

<style scoped lang="scss">
  .hotel-info {
    &__title {
      font: 700 17px/28px Montserrat;
      color: var(--title-color);
    }
    &__address {
      font: 500 13px/16px Montserrat;
      color: var(--address-color);
    }
  }
</style>