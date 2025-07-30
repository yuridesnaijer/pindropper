// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/leaflet",
    "@nuxtjs/supabase",
  ],
  css: ["~/assets/css/main.css"],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/account(/*)?"],
    },
  },
  runtimeConfig: {
    public: {
      authRedirectUrl: undefined,
    },
  },
});
