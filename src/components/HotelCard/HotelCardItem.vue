<script setup lang="ts">
import HotelInfo from './HotelInfo.vue'
import type { IHotelData } from '@/interfaces/IHotelData'
import type { ILatestHotelData } from '@/interfaces/ILatestHotelData'
import { onActivated } from 'vue'
import HostInfo from './HostInfo.vue'

import { ref, watchEffect } from 'vue'
import convertArrayPriceToString from '@/helperFunctions/convertArrayPriceToString'
import yandexMetrica from '@/services/yandexMetrika'
import SvgIcon from '@/components/UI/SvgIcon.vue'

import { register } from 'swiper/element/bundle' // регистрация свайпера
register()

const swiperEl = ref(null)
const paginationStyles = {
  // cтили для пагинации, которые нужно встроить в shadow DOM
  injectStyles: [
    `
    .swiper-pagination-bullets.swiper-pagination-horizontal {
      position: absolute;
      width: fit-content;
      top: unset;
      left: unset;
      right: 20px;
      bottom: 20px;
      z-index: 1;
    }
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }
    .swiper-pagination-bullet:hover {
      border: 1px solid var(--second-text-color);
    }
    `
  ]
}

const handleRouteClick = () => yandexMetrica.redirectToPage('/details')

interface IHotelCardItemProps {
  item: IHotelData | ILatestHotelData
  location: 'featured' | 'latest' | 'details'
}

defineProps<IHotelCardItemProps>()

const injectPaginationStyles = () => {
  if (swiperEl.value) {
    Object.assign(swiperEl.value, paginationStyles)
    swiperEl.value.initialize()
  }
}
watchEffect(injectPaginationStyles)
onActivated(injectPaginationStyles) // при переходе со страницы на страницу нужно заново инжектить стили для пагинации
</script>
<template>
  <li v-if="location === 'latest'" class="list-item list-item_latest">
    <router-link
      @click="handleRouteClick"
      :to="{ name: 'details', params: { id: item._id } }"
      class="item item_latest"
    >
      <div
        class="item__back-img item__back-img_latest"
        :style="{ backgroundImage: `url(${item.image})`, borderRadius: '8px' }"
      >
        <SvgIcon className="item__heart" id="heart" />
        <img class="item__img" :src="item.author.avatar" alt="avatar" />
        <HotelInfo :name="item.name" :address="item.address" />
      </div>
    </router-link>
  </li>
  <li v-else-if="location === 'featured'" class="list-item list-item_featured">
    <div class="item item_featured">
      <swiper-container
        init="false"
        ref="swiperEl"
        :pagination="{
          clickable: true
        }"
      >
        <swiper-slide v-for="(image, index) in (item as IHotelData).images" :key="index">
          <div
            class="item__back-img item__back-img_featured"
            :style="{ backgroundImage: `url(${image})`, borderRadius: '12px' }"
          >
            <SvgIcon className="item__heart" id="heart" />
            <div class="swiper-no-swiping item__price">
              {{ convertArrayPriceToString((item as IHotelData).price) }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
      <router-link
        @click="handleRouteClick"
        :to="{ name: 'details', params: { id: item._id } }"
        class="item__link"
      >
        <div class="item__container">
          <HotelInfo :name="item.name" :address="item.address" />
          <div class="item__flat-info flat-info">
            <div class="flat-info__bed">
              <SvgIcon className="flat-info__bed-icon" id="bedroom" />
              <span>{{ (item as IHotelData).info[0].bathroom }}</span>
            </div>
            <div class="flat-info__bath">
              <SvgIcon className="flat-info__bath-icon" id="bathroom" />
              <span>{{ (item as IHotelData).info[0].bedroom }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </li>
  <li v-else-if="location === 'details'" class="list-item list-item_details">
    <div class="item item_details">
      <swiper-container
        init="false"
        ref="swiperEl"
        :pagination="{
          clickable: true
        }"
      >
        <swiper-slide v-for="(image, index) in (item as IHotelData).images" :key="index">
          <div
            class="item__back-img item__back-img_details"
            :style="{ backgroundImage: `url(${image})`, borderRadius: '16px' }"
          >
            <SvgIcon className="item__heart" id="heart" />
            <HostInfo
              :name="(item as IHotelData).name"
              :avatar="(item as IHotelData).author.avatar"
              :price="(item as IHotelData).price"
            />
          </div>
        </swiper-slide>
      </swiper-container>
      <router-link
        @click="handleRouteClick"
        :to="{ name: 'details', params: { id: item._id } }"
        class="item__link item__link_details"
      >
        <div class="item__container">
          <HotelInfo :name="item.name" :address="item.address" />
          <div class="item__flat-info flat-info">
            <div class="flat-info__bed">
              <SvgIcon className="flat-info__bed-icon" id="bedroom" />
              <span>{{ (item as IHotelData).info[0].bathroom }}</span>
            </div>
            <div class="flat-info__bath">
              <SvgIcon className="flat-info__bath-icon" id="bathroom" />
              <span>{{ (item as IHotelData).info[0].bedroom }}</span>
            </div>
          </div>
          <div class="item__other-info other-info">
            <p>Apartment on Rent</p>
            <div class="other-info__separator"></div>
            <p>For Long Period: 1 - 2 Years</p>
          </div>
        </div>
      </router-link>
    </div>
  </li>
</template>

<style scoped lang="scss">
.list-item {
  &_latest {
    max-width: 279px;
    width: 100%;
    @media screen and (min-width: 768px) and (max-width: 1260px) {
      max-width: none;
      flex-basis: calc(50% - 30px);
      &:nth-child(even) {
        .item__back-img {
          margin-left: auto;
        }
      }
    }
  }
  &_featured {
    max-width: 382px;
    width: 100%;
  }
  &_details {
    max-width: 574px;
    width: 100%;
    box-shadow: 0px 0px 10px 0px var(--shadow-color);
    border-radius: 16px;
  }
}

.item {
  display: block;
  position: relative;
  border-radius: 8px;
  &__container {
    width: 100%;
  }
  &__back-img {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    padding: 22px 19px 20px 21px;
    min-height: 340px;
    &_details {
      min-height: 384px;
      max-width: 574px;
      width: 100%;
    }
    &_latest {
      max-width: 279px;
      width: 100%;
    }
    &_featured {
      max-width: 382px;
      width: 100%;
    }
  }
  &__img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  &__price {
    color: var(--second-text-color);
    font: 600 18px/22px Montserrat;
  }
  &__heart {
    position: absolute;
    top: 22px;
    right: 19px;
    width: 26px;
    height: 23px;
    cursor: pointer;
    transition: fill 0.3s ease-in;
    &:hover {
      fill: var(--follow-color);
    }
  }
  &__link {
    display: block;
    margin-top: 27px;
    &_details {
      padding: 0 25px 20px 25px;
    }
  }
  &__flat-info {
    margin-top: 20px;
    margin-left: 5px;
  }
  &__other-info {
    display: flex;
    gap: 17px;
    font: 600 14px/17px Montserrat;
    color: var(--second-text-color);
    margin-top: 25px;
  }
}
.flat-info {
  display: flex;
  align-items: center;
  gap: 20px;
  font: 600 16px/20px Montserrat;
  color: var(--main-text-color);
  &__bed,
  &__bath {
    display: flex;
    align-items: center;
  }
  &__bed-icon {
    width: 23px;
    height: 17px;
    margin-right: 9px;
  }
  &__bath-icon {
    width: 19px;
    height: 19px;
    margin-right: 8px;
  }
}
.other-info {
  &__separator {
    height: 18px;
    width: 1px;
    background-color: var(--separator-color);
  }
}
</style>
