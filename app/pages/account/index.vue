<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const { data } = useFetch("/api/locations");
</script>

<template>
  <template v-if="coords.longitude === null || coords.latitude === null">
    <div class="flex items-center justify-center h-screen">
      <UAlert type="warning" title="Geolocation not available">
        Please allow geolocation access in your browser settings.
      </UAlert>
    </div>
  </template>
  <UContainer v-else>
    <ClientOnly>
      <LMap
        style="height: 350px"
        :zoom="6"
        :center="[coords.latitude, coords.longitude]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
      </LMap>
    </ClientOnly>
    <UModal title="Save your current location" :dismissible="false">
      <div class="flex justify-center my-8">
        <UButton label="Save this location" />
      </div>

      <template #body>
        <SaveLocationForm :coords="coords" />
      </template>
    </UModal>

    <LocationList v-if="data?.locations" :locations="data.locations" />
  </UContainer>
</template>
