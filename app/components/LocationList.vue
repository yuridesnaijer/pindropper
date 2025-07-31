<script setup lang="ts">
defineProps<{ locations: any[] }>();
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-40">
    <li v-for="location in locations">
      <LocationCard :location="location" />
    </li>
  </ul>
</template>
