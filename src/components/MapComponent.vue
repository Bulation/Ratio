<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ZOOM } from "@/constants";
interface IMapProps {
  center: string[];
}

defineProps<IMapProps>()

</script>

<template>
    <l-map :use-global-leaflet="false" ref="map" v-model:zoom="ZOOM" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
</template>
