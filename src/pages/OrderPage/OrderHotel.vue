<script setup lang="ts">
import { usePreservedHotel } from '@/store/modules/orderModule';
import HotelInfo from '@/components/HotelInfo.vue';

const preservedHotelStore = usePreservedHotel();
const hotelState = preservedHotelStore.getPreservedHotel;
</script>

<template>
  <div class="order-hotel">
    <div class="order-hotel-header">
      <img class="order-hotel-header__img" :src="hotelState.image" alt="" />
      <div class="order-hotel-header__content">
        <HotelInfo :name="hotelState.name" :address="hotelState.address" />
        <div class="order-hotel-header__separator"></div>
        <div class="order-hotel-header__flats-info">
          <span v-for="(value, key) in hotelState.info[0]" :key="key">{{ value }} {{ key }}</span>
        </div>
      </div>
    </div>
    <div class="order-hotel__price-details">
      <h4 class="order-hotel__price-title">Price Details</h4>
      <p class="order-hotel__price-text">Short Period: {{ hotelState.price[0] }}</p>
      <p class="order-hotel__price-text">Medium Period: {{ hotelState.price[1] }}</p>
      <p class="order-hotel__price-text">Long Period: {{ hotelState.price[1] }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-hotel {
  max-width: 480px;
  padding: 30px 21px 45px 33px;
  border-radius: 10px;
  background-color: var(--flats-bg);
  &__price-details {
    margin-top: 48px;
  }
  &__price-title {
    font: 700 18px/22px Montserrat;
    color: var(--main-text-color);
    margin-bottom: 20px;
  }
  &__price-text {
    font: 500 15px/18px Montserrat;
    color: var(--second-text-color);
    margin-bottom: 10px;
  }
}

.order-hotel-header {
  display: flex;
  gap: 21px;
  &__img {
    width: 100px;
    height: 100px;
    border-radius: 6px;
  }
  &__content {
    margin-top: 5px;
  }
  &__separator {
    max-width: 305px;
    height: 1px;
    background-color: var(--separator-color);
    margin-top: 15px;
  }
  &__flats-info {
    display: flex;
    gap: 15px;
    margin-top: 10px;
    color: var(--second-text-color);
    font: 600 14px/17px Montserrat;
  }
  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
}
</style>
