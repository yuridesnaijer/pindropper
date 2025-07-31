<script setup lang="ts">
import * as z from "zod";
const { authRedirectUrl } = useRuntimeConfig().public;

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
    <UContainer class="flex flex-col items-center justify-center">
      <SignUpForm />
    </UContainer>
    <UContainer class="flex flex-col items-center justify-center mt-10">
      <LoginForm />
      <hr />
      or use magic link
      <UForm :state="OtpState" @submit="signInWithOtp">
        <UFormField>
          <UInput v-model="OtpState.email" type="email" />
        </UFormField>
        <UButton type="submit"> Sign In with E-Mail </UButton>
      </UForm>
    </UContainer>
  </div>
</template>
