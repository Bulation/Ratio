<script setup lang="ts">
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent.vue'
import { ElSkeletonItem } from 'element-plus'
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import OrderButton from '@/components/UI/OrderButton.vue'
import convertArrayPriceToString from '@/helperFunctions/convertArrayPriceToString'
import router from '@/router/router'
import { usePreservedHotel } from '@/store/modules/orderModule'
import yandexMetrica from '@/services/yandexMetrika'

const preservedHotelStore = usePreservedHotel()

interface IHotelPriceProps {
  hotel: IDetailedHotelData
}

const props = defineProps<IHotelPriceProps>()

const redirectToOrderPage = () => {
  preservedHotelStore.setPreservedHotel(props.hotel)
  router.push('/order')
  yandexMetrica.redirectToPage('/order')
}
</script>

<template>
  <LoaderComponent :data="hotel">
    <template #template>
      <ElSkeletonItem class="hotel-order-skeleton" variant="rect" />
    </template>
    <template #default>
      <div class="hotel-order">
        <div class="hotel-order__value">{{ convertArrayPriceToString(hotel.price) }}</div>
        <div class="hotel-order__separator"></div>
        <OrderButton @click="redirectToOrderPage" :isDisabled="false">Reserve Now</OrderButton>
      </div>
    </template>
  </LoaderComponent>
</template>

<style scoped lang="scss">
.hotel-order-skeleton {
  width: 382px;
  height: 201px;
  @include mobile {
    width: 100%;
  }
}

.hotel-order {
  max-width: 382px;
  margin-left: auto;
  padding: 30px;
  box-shadow: 0px 0px 16px 0px var(--hotel-shadow-color);
  border-radius: 10px;
  &__value {
    font: 700 22px/27px Montserrat;
    color: var(--main-text-color);
    margin-bottom: 27px;
  }
  &__separator {
    width: 100%;
    height: 1px;
    background-color: var(--separator-color);
    margin-bottom: 27px;
  }
}
</style>
