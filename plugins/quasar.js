import { Quasar, Notify } from 'quasar'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return 

  nuxtApp.vueApp.use(Quasar, {
    plugins: {
      Notify
    }, 
  })
})
