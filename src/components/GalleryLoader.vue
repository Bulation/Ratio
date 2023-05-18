<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import { ElSkeletonItem } from 'element-plus';
import ImagesGallery from './ImagesGallery.vue';

interface IGalleryLoaderProps {
  hotel: IDetailedHotelData
}
defineProps<IGalleryLoaderProps>()
</script>

<template>
<LoaderComponent :data="hotel">
      <template #template>
        <div class="gallery-skeleton">
          <ElSkeletonItem class="large-image-skeleton" variant="rect" />
          <ElSkeletonItem class="image-skeleton" variant="rect" />
          <ElSkeletonItem class="image-skeleton" variant="rect" />
          <ElSkeletonItem class="image-skeleton" variant="rect" />
          <ElSkeletonItem class="image-skeleton" variant="rect" />
        </div>
      </template>
      <template #default>
        <ImagesGallery :images="hotel.images" :avatar="hotel.author.avatar" :name="hotel.name" :price="hotel.price" />
      </template>
    </LoaderComponent>
</template>

<style scoped lang="scss">
.gallery-skeleton {
  max-width: 1334px;
  width: calc(100% - 30px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  grid-template-rows: 260px 260px;
  grid-gap: 17px;
  @media screen and (max-width: 700px) {
    display: block;
  }
}
.large-image-skeleton {
  display: block; 
  width: 668px; 
  height: 540px;
  grid-column: 1/3;
  grid-row: 1/3;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
}

.image-skeleton {
  display: block; 
  width: 315px; 
  height: 260px;
  @media screen and (max-width: 700px) {
    margin-top: 20px;
  }
}
</style>