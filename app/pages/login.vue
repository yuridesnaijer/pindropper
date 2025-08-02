<script setup lang="ts">
import * as z from "zod";
const { authRedirectUrl } = useRuntimeConfig().public;

definePageMeta({
  layout: "public",
  title: "Login",
});

const supabase = useSupabaseClient();
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Schema = z.output<typeof schema>;
const OtpState = reactive<Partial<Schema>>({
  email: "",
});
// TODO reuse in SignUpForm
const state = reactive<Schema>({
  email: "",
  password: "",
});

const signInWithOtp = async () => {
  if (!OtpState.email) {
    console.log("Email is required");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: OtpState.email,
    options: {
      emailRedirectTo: authRedirectUrl,
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <UContainer class="flex flex-col mt-8">
      <UCard variant="subtle">
        <h1 class="text-center">sign in</h1>
        <LoginForm />
        <div class="border-t border-muted my-8 pt-8 text-center">
          or use magic link
        </div>
        <UForm
          class="flex flex-col gap-4"
          :state="OtpState"
          @submit="signInWithOtp"
        >
          <UFormField>
            <UInput
              placeholder="e-mail"
              class="w-full"
              size="xl"
              v-model="OtpState.email"
              type="email"
            />
          </UFormField>
          <UButton type="submit"> Sign In with E-Mail </UButton>
        </UForm>
      </UCard>
    </UContainer>
  </div>
</template>
