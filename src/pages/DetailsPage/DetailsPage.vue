<script setup lang="ts">
import GalleryLoader from '@/components/GalleryLoader.vue';
import FlatsInfo from './FlatsInfo.vue';
import DetailsHeading from './DetailsHeading.vue';
import DetailsDescription from './DetailsDescription.vue';
import DetailsAmenities from './DetailsAmenities.vue';
import DetailsMap from './DetailsMap.vue';
import DetailsReviews from './DetailsReviews/DetailsReviews.vue'
import HotelOrder from './HotelOrder.vue';
import PageFooter from '@/layout/PageFooter/PageFooter.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import type { IDetailedHotelData } from '@/interfaces/IDetailedHotelData';
import API from '@/services/api';
import { useHead } from '@vueuse/head';

const route = useRoute();
const hotel = ref<IDetailedHotelData>(null);

onMounted(async () => {
  const id = route.params.id as string;
  hotel.value = await API.getHotelData(id);
})

watch(hotel, () => {
  useHead({
    title: `${hotel.value.name} hotel`,
    meta: [
      { name: 'description', content: `Details of ${hotel.value.name} hotel. There are described description, price, amenities, rating, reviews of the hotel` },
      { name: 'keywords', content: "hotel, amenities, preserve hotel, price, rating, reviews, map" },
      { property: 'og:title', content: `${hotel.value.name} hotel` },
      { property: 'og:description', content: `Details of ${hotel.value.name} hotel. There are described description, price, amenities, rating, reviews of the hotel`},
    ]
  })
})
</script>

<template>
  <main>
    <GalleryLoader :hotel="hotel" />
    <div class="hotel-main">
      <div class="hotel-body">
        <DetailsHeading :hotel="hotel" />
        <div class="hotel-body__flats-info">
          <FlatsInfo :hotel="hotel" />
        </div>
        <div class="hotel-body__details-description">
          <DetailsDescription :hotel="hotel" />
        </div>
        <div class="hotel-body__details-amenities">
          <DetailsAmenities :hotel="hotel" />
        </div>
        <div class="hotel-body__details-map">
          <DetailsMap :hotel="hotel" />
        </div>
        <div class="hotel-body__details-reviews">
          <DetailsReviews :hotel="hotel" />
        </div>
      </div>
      <div class="hotel-body__aside hotel-aside">
        <HotelOrder :hotel="hotel" />
      </div>
    </div>
  </main>
  <PageFooter />
</template>

<style scoped lang="scss">

main {
  padding: 36px 0 50px;
}

.hotel-main {
  display: flex;
  gap: 20px;
  max-width: 1206px;
  width: calc(100% - 30px);
  margin: 0 auto;
  padding-top: 90px;
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
  }
}

.hotel-body {
  &__flats-info {
    margin-top: 56px;
  }
  &__details-description {
    margin-top: 57px;
  }
  &__details-amenities {
    margin-top: 62px;
  }
  &__details-map {
    margin-top: 56px;
  }
  &__details-reviews {
    margin-top: 43px;
  }
  &__aside {
    margin-top: 5px;
  }
}
</style>