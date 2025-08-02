// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "nuxt-mapbox",
  ],
  css: ["~/assets/css/main.css"],
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/account(/*)?"],
      exclude: ["/login", "/confirm", "/"],
    },
  },
  mapbox: {
    accessToken: process.env.MAPBOX_TOKEN,
  },
  runtimeConfig: {
    public: {
      authRedirectUrl: "https://pindropper.netlify.app/confirm",
    },
  },
});
