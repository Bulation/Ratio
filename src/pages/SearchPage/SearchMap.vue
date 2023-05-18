<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ElSkeletonItem } from 'element-plus';
import MapComponent from '@/components/MapComponent.vue';
import SearchAboutHotel from './SearchAboutHotel.vue';
interface ISearchMapProps {
  firstHotel: IDetailedHotelData
}
defineProps<ISearchMapProps>()
</script>

<template>
<LoaderComponent :style="'width: auto;'" :data="firstHotel">
      <template #template>
        <ElSkeletonItem class='map-skeleton' variant="rect" />
      </template>
      <template #default>
        <div class="map">
          <MapComponent :center="firstHotel.coords" />
          <SearchAboutHotel :name="firstHotel.name" :address="firstHotel.address" :amenities="firstHotel.amenities" />
        </div>
      </template>
    </LoaderComponent>
</template>

<style scoped lang="scss">
.map {
  position: relative;
  width: 100%;
  max-width: 668px;
  height: 757px;
}

.map-skeleton {
  display: block; 
  width: 668px; 
  height: 757px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
</style>