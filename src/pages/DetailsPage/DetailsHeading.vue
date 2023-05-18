<script setup lang="ts">
import SvgIcon from '@/components/UI/SvgIcon.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import { ElSkeletonItem } from 'element-plus'
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
interface IDetailsHeadingProps {
  hotel: IDetailedHotelData
}
defineProps<IDetailsHeadingProps>()
</script>

<template>
  <LoaderComponent :data="hotel">
      <template #template>
        <ElSkeletonItem class='details-heading-skeleton-text' variant="h1" />
        <ElSkeletonItem class='details-heading-skeleton-text' variant="text" />
      </template>
      <template #default>
        <div class="details-heading">
          <div class="details-heading__text">
            <h2 class="details-heading__title">{{ hotel.name }}</h2>
            <p class="details-heading__address">{{ hotel.address }}</p>
          </div>
          <div class="details-heading__share">
            <SvgIcon className="details-heading__share-svg" id="heart" />
            <SvgIcon className="details-heading__share-svg" id="share" />
          </div>
        </div>
      </template>
  </LoaderComponent>
</template>

<style scoped lang="scss">
.details-heading-skeleton-text {
    width: 420px;
    height: 34px;
    @media screen and (max-width: 450px) {
      width: 100%;
    }
}
  .details-heading {
    max-width: 760px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    color: var(--main-text-color);
    &__title {
      font: 700 28px/34px Montserrat;
    }
    &__address {
      font: 500 16px/20px Montserrat;
      color: var(--second-text-color);
      margin-top: 7px;
    }
    &__share-svg {
      width: 32px;
      height: 32px;
      margin-right: 23px;
      transition: all 0.3s ease-in;
      cursor: pointer;
      &:hover {
        fill: red;
      }
    }
  }
</style>