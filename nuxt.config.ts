// https://nuxt.com/docs/api/configuration/nuxt-config
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Relizens",
      meta: [
        {
          name: "description",
          content: "Assignment for Rezliens Compay with Nuxt3 + TS + Pinia",
        },
      ],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@pinia/nuxt"],
  dirs: ["icons"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  }
});
