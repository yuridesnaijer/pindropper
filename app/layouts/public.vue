<script setup lang="ts">
import Aurora from "~/components/vue-bits/Backgrounds/Aurora/Aurora.vue";
</script>

<template>
  <main>
    <PageHeader />
    <Aurora
      :color-stops="['#fa2fa2', '#faf02f', '#73fa2f']"
      :speed="0.4"
      class="top-0 bottom-0 fixed z-0"
    />
    <UContainer class="z-10 relative">
      <slot />
    </UContainer>
  </main>
</template>

<style scoped></style>
