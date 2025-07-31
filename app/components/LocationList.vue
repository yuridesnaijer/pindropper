<script setup lang="ts">
import type { TLocation } from "~/composables/useLocations";

defineProps<{ locations: TLocation[] }>();
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-40">
    <li v-for="location in locations">
      <LocationCard :location />
    </li>
  </ul>
</template>
