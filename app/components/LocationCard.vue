<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const { location } = defineProps<{ location: any }>();

const directionsUrl = computed(() => {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(coords.value.latitude)},${encodeURIComponent(coords.value.longitude)}&destination=${encodeURIComponent(location.latitude)},${encodeURIComponent(location.longitude)}&travelmode=driving`;
});

const deleteLocation = async (id: string) => {
  await $fetch("api/locations/", {
    method: "DELETE",
    body: { id },
  });
};
</script>

<template>
  <UCard
    :ui="{
      body: 'flex flex-col grow',
    }"
    class="flex flex-col h-full"
    :key="location.id"
  >
    <template #header>
      {{ location.name }}
    </template>
    <template #default class="grow">
      <NuxtImg
        v-if="location.image_url"
        :src="location.image_url"
        class="w-full h-48 object-cover"
      />
      <div>
        <UBadge color="info" v-for="tag in location.tags">{{ tag }}</UBadge>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between items-center">
        <UButton
          variant="outline"
          color="neutral"
          :href="directionsUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </UButton>
        <UButton
          variant="outline"
          color="error"
          @click="() => deleteLocation(location.id)"
        >
          <UIcon name="material-symbols:delete-outline" size="16" />
        </UButton>
      </div>
    </template>
  </UCard>
</template>
