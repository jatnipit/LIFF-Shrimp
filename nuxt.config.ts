// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/ngrok",
  ],

  plugins: [
    {
      src: "~/plugins/liff.js",
      mode: "client",
    },
  ],

  ssr: false,
  runtimeConfig: {
    public: {
      liffId: process.env.LIFF_ID,
      promptpayPhoneNumber: process.env.PROMPTPAY_PHONE_NUMBER,
    },
  },

  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  ngrok: {
    authtoken_from_env: true,
    domain: "toucan-loving-slowly.ngrok-free.app",
  },

  vite: {
    server: {
      allowedHosts: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    },
  },
});
