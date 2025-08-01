<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const signOut = () => {
  supabase.auth.signOut().then(() => {
    useRouter().push({ name: "home" });
  });
};
</script>
<template>
  <main>
    <header
      class="py-4 border-b border-muted sticky top-0 z-10 bg-white dark:bg-gray-900"
    >
      <UContainer class="flex items-center justify-between">
        <h1 class="text-xl"><span class="font-bold">Pin</span>dropper</h1>
        <nav>
          <ul class="flex gap-4 justify-end">
            <li>
              <ThemeSwitch />
            </li>
            <li v-if="user">
              <UButton @click="signOut">Sign out</UButton>
            </li>
          </ul>
        </nav>
      </UContainer>
    </header>
    <slot />
  </main>
</template>
