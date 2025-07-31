<script setup lang="ts">
import * as z from "zod";
const supabase = useSupabaseClient();
const { add: addToast } = useToast();
const router = useRouter();

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Schema = z.output<typeof schema>;
const state = reactive<Schema>({
  email: "",
  password: "",
});

const signInWithPassword = async () => {
  try {
    await schema.parseAsync(state);
  } catch (error) {
    addToast({
      title: "Validation Error",
      description:
        error instanceof z.ZodError ? error.message : "Invalid input",
      color: "error",
    });
    return;
  }

  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    if (data) {
      addToast({
        title: "Sign In Successful",
        description: "You have successfully signed in.",
        color: "success",
      });

      await router.push({ name: "account" });
    }
  } catch (error) {
    addToast({
      title: "Sign In Error",
      description: error instanceof Error ? error.message : "An error occurred",
      color: "error",
    });
  }
};
</script>

<template>
  <UForm :state="state" @submit="signInWithPassword">
    <UFormField>
      <UInput v-model="state.email" type="email" />
    </UFormField>
    <UFormField>
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit"> Sign In with E-Mail </UButton>
  </UForm>
</template>
