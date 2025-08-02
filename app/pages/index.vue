<script setup lang="ts">
definePageMeta({
  layout: "public",
  title: "Home",
});
const user = useSupabaseUser();
</script>

<template>
  <UContainer class="z-10 relative">
    <div class="flex gap-8 justify-space-between items-center h-svh">
      <section class="grow justify-items-center hidden md:block">
        <NuxtImg
          class="rounded-2xl max-w-xl"
          src="https://png.pngtree.com/png-clipart/20230206/ourmid/pngtree-mobile-phone-mockup-3-png-image_6584022.png"
        />
      </section>
      <section class="grow justify-items-center">
        <UCard variant="subtle" class="text-center" v-if="!user">
          <header class="mb-8">
            <h1 class="text-4xl mb-4">Pin places, revisit memories</h1>
            <p>
              Create an account and keep track of the fun places you went so you
              can revisit them.
            </p>
          </header>
          <div class="max-w-[320px] mx-auto">
            <LoginForm />
          </div>
          <div class="text-center mt-4">
            <p class="text-gray-500">Don't have an account yet?</p>
          </div>
          <template #footer>
            <NuxtLink to="/register" class="text-blue-500 hover:underline"
              >Register</NuxtLink
            >
          </template>
        </UCard>
        <UCard v-else>
          <header>
            <h1 class="text-2xl">Welcome back!</h1>
            <p class="text-gray-500">You are logged in as {{ user.email }}.</p>
          </header>
          <UButton to="/account" class="w-full mt-8">
            Go to your account
          </UButton>
        </UCard>
      </section>
    </div>
  </UContainer>
</template>
