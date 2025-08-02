<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const user = useSupabaseUser();
const { coords } = useGeolocation();
const { locations, fetchLocations } = useLocations();
const isModalOpen = ref(false);

const handleUploadSuccess = () => {
  isModalOpen.value = false;
};

const currentCoords = computed(() => {
  const { longitude, latitude } = coords.value;

  if (
    !longitude ||
    !latitude ||
    latitude === Number.POSITIVE_INFINITY ||
    longitude === Number.POSITIVE_INFINITY
  ) {
    return { longitude: 0, latitude: 0 };
  }

  return { longitude, latitude };
});

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
      <ClientOnly v-if="user">
        <MapboxMap
          :map-id="user.id"
          style="position: relative; width: 100%; height: 30svh"
          :options="{
            style: 'mapbox://styles/mapbox/standard',
            config: {
              basemap: {
                lightPreset: 'dawn', //TODO: make this based off time of day
                showPedestrianRoads: false,
                show3dObjects: false,
              },
            },
            pitch: 40,
            center: [currentCoords.longitude, currentCoords.latitude],
            zoom: 15,
          }"
        />
      </ClientOnly>

      <h1 class="text-2xl mb-4 text-center">Your Locations</h1>
      <LocationList v-if="locations" :locations="locations" />
    </UContainer>

    <footer
      class="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-muted py-4"
    >
      <UContainer class="flex justify-center">
        <UButton
          size="xl"
          class="w-full max-w-md"
          @click="isModalOpen = true"
          label="Save your current location"
        />
      </UContainer>
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
    </footer>
  </div>
</template>
