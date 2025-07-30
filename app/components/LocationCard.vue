<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";

const { coords } = useGeolocation();
const { location } = defineProps<{ location: any }>();

const directionsUrl = computed(() => {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(coords.value.latitude)},${encodeURIComponent(coords.value.longitude)}&destination=${encodeURIComponent(location.latitude)},${encodeURIComponent(location.longitude)}&travelmode=driving`;
});
</script>

<template>
  <UCard class="mb-4" :key="location.id">
    <template #header>
      {{ location.name }}
    </template>
    <NuxtImg :src="location.image_url" class="w-full h-48 object-cover" />
    {{ location }}
    <UBadge color="info" v-for="tag in location.tags">{{ tag }}</UBadge>
    <template #footer>
      <UButton :href="directionsUrl" target="_blank" rel="noopener noreferrer">
        Get Directions
      </UButton>
    </template>
  </UCard>
</template>
