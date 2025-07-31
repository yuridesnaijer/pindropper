<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const { locations, fetchLocations } = useLocations();
const isModalOpen = ref(false);

const handleUploadSuccess = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  fetchLocations();
});
</script>

<template>
  <div>
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
      <div class="flex justify-center my-8">
        <UButton
          size="xl"
          @click="isModalOpen = true"
          label="Save your current location"
        />
      </div>
      <UModal
        v-model:open="isModalOpen"
        title="Save this location"
        :dismissible="true"
      >
        <template #body>
          <SaveLocationForm
            @upload-successful="handleUploadSuccess"
            :coords="coords"
          />
        </template>
      </UModal>

      <h1 class="text-2xl mb-4 text-center">Your Locations</h1>
      <LocationList v-if="locations" :locations="locations" />
    </UContainer>
  </div>
</template>
