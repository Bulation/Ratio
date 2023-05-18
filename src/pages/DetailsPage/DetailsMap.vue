<script setup lang="ts">
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ElSkeletonItem } from 'element-plus';
import MapComponent from '@/components/MapComponent.vue';
interface ISearchMapProps {
  hotel: IDetailedHotelData
}
defineProps<ISearchMapProps>()
</script>

<template>
<LoaderComponent :style="'width: auto;'" :data="hotel">
      <template #template>
        <ElSkeletonItem class='map-skeleton' variant="rect" />
      </template>
      <template #default>
        <div class="map">
          <MapComponent :center="hotel.coords" />
        </div>
      </template>
    </LoaderComponent>
</template>

<style scoped lang="scss">
.map {
  position: relative;
  width: 100%;
  max-width: 771px;
  height: 420px;
}

.map-skeleton {
  display: block; 
  width: 771px; 
  height: 420px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
</style>