<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const signOut = () => {
  supabase.auth.signOut().then(() => {
    useRouter().push({ name: "login" });
  });
};
</script>
<template>
  <main>
    <header class="py-4 border-b border-muted">
      <UContainer>
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
