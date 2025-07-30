<script setup lang="ts">
defineProps<{ locations: any[] }>();
</script>

<template>
  <ul>
    <li v-for="location in locations">
      <LocationCard :location="location" />
    </li>
  </ul>
</template>
