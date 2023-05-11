<script setup lang="ts">
import type { IAmenity } from '@/interfaces/IAmenity';
import HotelInfo from './HotelInfo.vue';

interface ISearchAboutHotelProps {
  name: string,
  address: string
  amenities: IAmenity[]
}
defineProps<ISearchAboutHotelProps>()
</script>

<template>
<div class="hotel-info-wrapper">
            <div class="about-hotel">
              <HotelInfo :name="name" :address="address" />
              <ul class="amenities-list">
                <li class="amenities-list__item amenity" v-for="(amenity, ind) in amenities.slice(0, 4)" :key="amenity.icon">
                  <div :style="`background-image: url(${amenity.icon})`" class="amenity__icon"></div>
                  <span>{{ ind }}</span> <!-- в бэке нет инфы о количестве amenity, поэтому стоит заглушка -->
                </li>
              </ul>
            </div>
          </div>
</template>

<style scoped lang="scss">
.hotel-info-wrapper {
  width: 485px;
  position: absolute;
  z-index: 1000;
  bottom: 117px;
  left: 50%;
  right: 50%;
  transform: translate(-50%);
  background-color: var(--hotel-info-bg);
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 490px) {
    width: 100%;
  }
}

.about-hotel {
  max-width: 325px;
  padding: 26px 36px 43px 18px;
  background-color: #ffffff;
}

.amenities-list {
  display: flex;
  padding-top: 20px;
  gap: 15px;
  font: 600 16px/20px Montserrat;
  color: var(--main-text-color);
}

.amenity {
  display: flex;
  align-items: center;
  gap: 9px;
  &__icon {
    width: 23px;
    height: 23px;
    background-position: center;
  }
}
</style>