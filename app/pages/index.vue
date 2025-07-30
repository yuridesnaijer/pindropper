<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

const { coords } = useGeolocation()

</script>

<template>
  <UContainer>
  <LMap
      style="height: 350px"
      :zoom="50"
      :center="[coords.latitude, coords.longitude]"
      :use-global-leaflet="false"
  >
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
    />
  </LMap>

  <UButton>Save</UButton>
  </UContainer>
</template>