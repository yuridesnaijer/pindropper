<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  email: undefined,
})
const signInWithOtp = async () => {
  if(!state.email) {
    console.log('Email is required')
    return
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: state.email,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) console.log(error)
}
</script>
<template>
  <UContainer>
    <div class="flex flex-col items-center justify-center h-screen">
      <UForm :state="state" @submit="signInWithOtp">
        <UFormField>
          <UInput
              v-model="state.email"
              type="email"
          />
        </UFormField>
        <UButton type="submit">
          Sign In with E-Mail
        </UButton>
      </UForm>
    </div>

  </UContainer>
</template>
