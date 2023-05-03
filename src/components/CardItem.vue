<script setup lang="ts">
import HotelInfo from './HotelInfo.vue';
import type { ILatestData } from '@/interfaces/ILatestData';
import type { IFeaturedData } from '@/interfaces/IFeaturedData';

import SvgIcon from './UI/SvgIcon.vue';

import { register } from 'swiper/element/bundle';
register();

import { ref, watchEffect } from 'vue';
import convertArrayPriceToString from '@/helperFunctions/convertArrayPriceToString';

const swiperEls = ref([]);
const params = {
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
      li {
        width: 10px;
        height: 10px;
      }
    }
    `,
  ]
};

interface ICardItemProps {
  list: IFeaturedData[] | ILatestData[]
  location: "featured" | "latest" | "details"
}

defineProps<ICardItemProps>()
  
watchEffect(() => {
  if (swiperEls.value.length) {
    swiperEls.value.forEach((swiperEl) => {
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    });
  }
});

</script>
<template>
  <template v-for="item in list" :key="item._id">
    <li v-if="location === 'latest'" class="list-item list-item_latest">
      <a href="#" class="item item_latest">
        <div class="item__back-img" :style="{ backgroundImage: `url(${item.image})`, borderRadius: '8px'}">
          <SvgIcon className="item__heart" id="heart" />
          <img class="item__img" :src="item.author.avatar" alt="avatar" />
          <HotelInfo :name="item.name" :address="item.address" />
        </div>
      </a>
    </li>
    <li v-else-if="location === 'featured'" class="list-item list-item_featured">
      <div class="item item_featured">
        <swiper-container
          init="false"
          ref="swiperEls"
          :pagination="{
            clickable: true
          }"
        >
          <swiper-slide class="slide" v-for="(image, index) in (item as IFeaturedData).images" :key="index">
            <div class="item__back-img" :style="{ backgroundImage: `url(${image})`, borderRadius: '12px' }">
              <SvgIcon className="item__heart" id="heart" />
              <div class="swiper-no-swiping item__price">{{ convertArrayPriceToString((item as IFeaturedData).price) }}</div>
            </div>
          </swiper-slide>
        </swiper-container>
        <a class="item__link" href="#">
          <div class="item__container">
            <HotelInfo :name="item.name" :address="item.address" />
            <div class="item__flat-info flat-info">
              <div class="flat-info__bed">
                <SvgIcon className="flat-info__bed-icon" id="bed" />
                <span>{{ (item as IFeaturedData).info[0].bathroom }}</span>
              </div>
              <div class="flat-info__bath">
                <SvgIcon className="flat-info__bath-icon" id="bath" />
                <span>{{ (item as IFeaturedData).info[0].bedroom }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </li>
  </template>
</template>
  

<style scoped lang="scss">
  .slide {
    height: auto;
    max-width: 382px;
    width: 100%;
  }

  .list-item {
    &_latest {
      max-width: 279px;
      width: 100%;
    }
    &_featured {
      max-width: 382px;
      width: 100%;
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
        fill: red;
      }
    }
    &_latest {
      max-width: 279px;
      width: 100%;
    }
    &_featured {
      max-width: 382px;
      width: 100%;
    }
    &__link {
      display: block;
      margin-top: 27px;
    }
    &__flat-info {
      margin-top: 15px;
      margin-left: 5px;
    }
  }
  .flat-info {
    display: flex;
    align-items: center;
    gap: 20px;
    font: 600 16px/20px Montserrat;
    color: var(--main-text-color);
    &__bed, &__bath {
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
</style>