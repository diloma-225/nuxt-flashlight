// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/ionic',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],
  googleFonts: {
    families: {
      Urbanist: [400, 600], // ou Poppins, Inter, Sora selon ton choix
    },
    display: 'swap'
  },
  ssr: false,
})