<script setup lang="ts">
import { RATING_LIST, MAX_RATING_WIDTH } from '@/constants/constants'
const finalRatingWidth = (rating: number) => MAX_RATING_WIDTH * (rating / 5)
</script>

<template>
  <ul class="ratings-list">
    <li class="ratings-list__item rating" v-for="rating in RATING_LIST" :key="rating.name">
      <span class="rating__name">{{ rating.name }}</span>
      <div class="rating__mark-wrapper">
        <div class="rating__bar" :style="`width: ${finalRatingWidth(rating.mark)}px`"></div>
        <span class="rating__mark">{{ rating.mark.toFixed(1) }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.ratings-list {
  column-count: 2;
  &__item {
    margin-bottom: 15px;
  }
  @include tablet {
    column-count: 1;
  }
}

.rating {
  max-width: 366px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: 500 16px/20px Montserrat;
  color: var(--main-text-color);
  &__bar {
    height: 4px;
    border-radius: 2px;
    background-color: var(--second-text-color);
    margin-right: 13px;
  }
  &__mark {
    font-weight: 600;
  }
  &__mark-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
