<script setup lang="ts">
definePageMeta({
  layout: "public",
  title: "Register",
});
</script>

<template>
  <UCard variant="subtle" class="mt-8 max-w-md mx-auto">
    <template #header> Create an Account </template>
    <SignUpForm />
  </UCard>
</template>
