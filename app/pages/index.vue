<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <UContainer>
    <div class="flex gap-8 justify-space-between items-center h-screen">
      <section class="grow justify-items-center">
        <NuxtImg
          class="rounded-2xl max-w-xl"
          src="https://lh3.googleusercontent.com/hS0GhTeGOn0KjmKHAZH5REwGIw1lDtYru8xUQWPLKGX2OEU1IbsddcJnUKYrI9oQ57ax_WOFlCf3rRe8SIwnmoswi-mNYVoaNGZer2Po=rw-e365-nu-w1400-v1"
        />
      </section>
      <section class="grow justify-items-center">
        <UCard class="text-center" v-if="!user">
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
