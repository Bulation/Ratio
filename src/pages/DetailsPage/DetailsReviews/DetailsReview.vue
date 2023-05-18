<script setup lang="ts">
import getCreatedDate from '@/helperFunctions/getCreatedDate'
import type { IAuthor } from '@/interfaces/IAuthor'
interface IDetailsReviewProps {
  review: IAuthor
}
defineProps<IDetailsReviewProps>()
</script>

<template>
  <div class="details-review">
    <div class="details-review__heading">
      <img class="details-review__avatar" :src="review.author.avatar" alt="Reviewer avatar" />
      <div class="details-review__author-info">
        <h4 class="details-review__author-name">
          {{ review.author.name }} {{ review.author.surname }}
        </h4>
        <p class="details-review__author-date">{{ getCreatedDate(review.date) }}</p>
      </div>
    </div>
    <p class="details-review__content">{{ review.content }}</p>
  </div>
</template>

<style scoped lang="scss">
.details-review {
  &__heading {
    display: flex;
    align-items: center;
    gap: 17px;
  }
  &__avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  &__author-name {
    font: 700 16px/20px Montserrat;
    color: var(--main-text-color);
  }
  &__author-date {
    font: 500 14px/17px Montserrat;
    color: var(--second-text-color);
  }
  &__content {
    font: 400 15px/20px Montserrat;
    color: var(--second-text-color);
    margin-top: 20px;
  }
}
</style>
