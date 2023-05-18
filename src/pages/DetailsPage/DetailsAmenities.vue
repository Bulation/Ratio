<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import LoaderComponent from '@/components/LoaderComponent.vue'
import DetailsExpandButton from '@/components/UI/DetailsExpandButton.vue'
import { ElSkeletonItem } from 'element-plus'
import { ref, watch } from 'vue'

interface IDetailsAmenitiesProps {
  hotel: IDetailedHotelData
}
const props = defineProps<IDetailsAmenitiesProps>()
const isExpand = ref(false)
const copyAmenities = ref([])
const showMore = () => {
  copyAmenities.value = props.hotel.amenities
  isExpand.value = true
}
watch(
  () => props.hotel,
  () => (copyAmenities.value = props.hotel.amenities.slice(0, 6))
)
</script>

<template>
  <LoaderComponent :data="hotel">
    <template #template>
      <h3>Offered Amenities</h3>
      <div class="amenities-skeleton-wrapper">
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
        <ElSkeletonItem class="amenities-text-skeleton" variant="text" />
      </div>
    </template>
    <template #default>
      <div class="details-amenities">
        <h3 class="details-amenities__title">Offered Amenities</h3>
        <ul class="details-amenities-list">
          <TransitionGroup name="amenity">
            <li class="amenity" v-for="amenity in copyAmenities" :key="amenity.icon">
              <div :style="`background-image: url(${amenity.icon})`" class="amenity__icon"></div>
              <span class="amenity__name">{{ amenity.name }}</span>
            </li>
          </TransitionGroup>
        </ul>
        <DetailsExpandButton
          class="details-amenities__button"
          v-if="!isExpand && hotel.amenities.length > 6"
          @click="showMore"
          type="button"
          >Show All {{ hotel.amenities.length }} Amenities</DetailsExpandButton
        >
      </div>
    </template>
  </LoaderComponent>
</template>

<style scoped lang="scss">
.amenities-skeleton-wrapper {
  column-count: 2;
  @media screen and (max-width: 768px) {
    column-count: 1;
  }
}

.amenities-text-skeleton {
  width: 230px;
  height: 23px;
}

.details-amenities {
  &__title {
    font: 700 22px/25px Montserrat;
    color: var(--main-text-color);
    margin-bottom: 29px;
  }
  &__button {
    margin-top: 20px;
  }
}

.details-amenities-list {
  max-width: 680px;
  display: flex;
  flex-wrap: wrap;
}

.amenity {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
  &__name {
    font: 500 16px/18px Montserrat;
    color: var(--main-text-color);
  }
  &__icon {
    width: 30px;
    height: 30px;
    background-position: center;
  }
}

.amenity-enter-active {
  transition: all 0.7s ease-in;
}

.amenity-enter-from {
  transform: translateX(100%);
}
</style>
