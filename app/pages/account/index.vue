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
          style="position: relative; width: 100%; height: 350px"
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
