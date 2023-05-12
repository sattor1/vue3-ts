import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import SButton from './components/button/index.vue'
import SModal from '@/components/modal/index.vue'
import SInput from '@/components/input/index.vue'
import Preloader from './components/preloader/index.vue'

const app = createApp(App)

app
  .component('SButton', SButton)
  .component('Preloader', Preloader)
  .component('SModal', SModal)
  .component('SInput', SInput)

app.use(createPinia())
app.use(router)

app.mount('#app')
