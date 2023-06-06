<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData'
import SvgIcon from '@/components/UI/SvgIcon.vue'
import DetailsRating from './DetailsRating/DetailsRating.vue'
import DetailsReview from './DetailsReview/DetailsReview.vue'
import DetailsExpandButton from '@/components/UI/DetailsExpandButton.vue'
import LoaderComponent from '@/components/LoaderComponent/LoaderComponent.vue'
import { ElSkeletonItem } from 'element-plus'
import { ref, watch } from 'vue'
import { TOTAL_RATING } from '@/constants/constants'

interface IDetailsReviewsProps {
  hotel: IDetailedHotelData
}

const props = defineProps<IDetailsReviewsProps>()
const isExpand = ref(false)
const copyReviews = ref([])
const showMore = () => {
  copyReviews.value = props.hotel.reviews
  isExpand.value = true
}

watch(
  () => props.hotel,
  () => {
    copyReviews.value = props.hotel?.reviews.slice(0, 4)
  }
)
</script>

<template>
  <div class="details-reviews">
    <div class="details-reviews__heading">
      <h3 class="details-reviews__title">Reviews</h3>
      <SvgIcon className="details-reviews__icon" id="star" />
      <span className="details-reviews__total-rating">{{ TOTAL_RATING.toFixed(1) }}</span>
    </div>
    <div class="details-reviews__rating">
      <DetailsRating />
    </div>
    <ul class="details-reviews__list">
      <LoaderComponent class="reviews-skeleton-wrapper" :data="hotel" :count="4">
        <template #template>
          <div class="review-skeleton">
            <ElSkeletonItem class="review-avatar-skeleton" variant="circle" />
            <ElSkeletonItem class="review-name-skeleton" variant="h3" />
            <ElSkeletonItem class="review-date-skeleton" variant="text" />
            <ElSkeletonItem class="review-text-skeleton" variant="text" />
          </div>
        </template>
        <template #default>
          <TransitionGroup name="review">
            <li class="details-reviews__review" v-for="review in copyReviews" :key="review.content">
              <DetailsReview :review="review" />
            </li>
          </TransitionGroup>
        </template>
      </LoaderComponent>
    </ul>
    <DetailsExpandButton
      v-if="!isExpand && hotel?.reviews.length > 4"
      @click="showMore"
      type="button"
      >Show All {{ hotel.reviews.length }} Reviews</DetailsExpandButton
    >
  </div>
</template>

<style scoped lang="scss">
.details-reviews {
  &__heading {
    display: flex;
    align-items: center;
    gap: 16px;
    font: 700 22px/27px Montserrat;
    color: var(--main-text-color);
    margin-bottom: 26px;
  }
  &__title {
    font: 700 22px/27px Montserrat;
  }
  &__rating {
    margin-bottom: 50px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 50px;
  }
  &__icon {
    width: 20px;
    height: 20px;
  }
  &__review {
    width: calc(50% - 20px);
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}

.reviews-skeleton-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.review-skeleton {
  width: calc(50% - 20px);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.review-avatar-skeleton {
  display: inline-block;
  width: 70px;
  height: 70px;
  margin-right: 17px;
}

.review-name-skeleton {
  width: 150px;
  height: 30px;
}

.review-date-skeleton {
  width: 95px;
  height: 30px;
}

.review-text-skeleton {
  margin-top: 20px;
  width: 320px;
  height: 80px;
}

.review-enter-active {
  transition: all 0.7s ease-in;
}

.review-enter-from {
  transform: translateX(100%);
}
</style>
