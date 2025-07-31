<script setup lang="ts">
import * as z from "zod";

const supabase = useSupabaseClient();
const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Schema = z.output<typeof schema>;
const state = reactive<Schema>({
  email: "",
  password: "",
});

const signUp = async () => {
  try {
    await schema.parseAsync(state);
  } catch (error) {
    console.log("Validation error:", error);
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: state.email,
    password: state.password,
  });

  if (error) {
    console.log("Sign up error:", error);
  }
};
</script>

<template>
  <UForm :state>
    <UFormField label="Email">
      <UInput type="email" required v-model="state.email" />
    </UFormField>
    <UFormField label="Password">
      <UInput type="password" required v-model="state.password" />
    </UFormField>
    <UButton type="submit" @click="signUp"> Sign Up </UButton>
  </UForm>
</template>
