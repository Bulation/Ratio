<script setup lang="ts">
import HostInfo from '@/components/HostInfo.vue'
import { ref } from 'vue'
interface IDetailsGalleryProps {
  images: string[]
  avatar: string
  name: string
  price: string[]
}
const props = defineProps<IDetailsGalleryProps>()
const copyImages = ref(props.images.slice(0, 5))
const isImagesShown = ref(false)
const imagesCount = ref(props.images.length - copyImages.value.length)

const showMore = () => {
  copyImages.value = props.images
  isImagesShown.value = true
}
</script>

<template>
  <TransitionGroup name="gallery" class="gallery" tag="section">
    <div class="gallery__image-wrapper" v-for="(image, i) in copyImages" :key="image">
      <img class="gallery__image" :src="image" alt="gallery image" />
      <div class="gallery__host-info" v-if="i === 0">
        <HostInfo :avatar="avatar" :name="name" :price="price" />
      </div>
      <div
        class="image-content"
        v-if="i === copyImages.length - 1 && !isImagesShown"
        @click="showMore"
      >
        <div class="image-content__count">+{{ imagesCount }}</div>
        <div class="image-content__text">
          <div class="image-content__text_top">More</div>
          <div class="image-content__text_bottom">Photos</div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.gallery {
  max-width: 1334px;
  width: calc(100% - 30px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-template-rows: 260px 260px;
  grid-gap: 17px;
  &__host-info {
    position: absolute;
    bottom: 54px;
    left: 65px;
    @media screen and (max-width: 420px) {
      bottom: 35px;
      left: 10px;
    }
  }
  &__image-wrapper {
    position: relative;
    width: 100%;
    min-width: 315px;
    min-height: 260px;
    &:first-child {
      grid-column: 1/3;
      grid-row: 1/3;
      img {
        border-radius: 16px;
      }
    }
  }
  &__image {
    object-fit: cover;
    max-width: 100%;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    display: block;
    width: calc(100% - 10px);
  }
}

.image-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font: 700 48px/59px Montserrat;
  color: var(--main-text-color);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  &__text {
    &_top {
      font: 600 14px/17px Montserrat;
    }
    &_bottom {
      font: 700 18px/22px Montserrat;
    }
  }
}
.gallery-enter-active {
  transition: all 0.7s ease-in;
}

.gallery-enter-from {
  transform: translateX(100%);
}
</style>
