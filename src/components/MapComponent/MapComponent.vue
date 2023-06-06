<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet'
interface IMapProps {
  center: string[]
}

const icon = {
  iconUrl: '/img/icon.png',
  iconSize: [52, 66]
}
defineProps<IMapProps>()
</script>

<template>
  <l-map :use-global-leaflet="false" ref="map" :zoom="10" :center="center">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>
    <l-marker :lat-lng="center">
      <l-icon :icon-url="icon.iconUrl" :icon-size="icon.iconSize" />
    </l-marker>
  </l-map>
</template>
