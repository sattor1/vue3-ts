<template>
  <section class="app-main">
    <Header />
    <RouterView class="app-main__content" />
    <Footer class="app-main__footer" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

.app-main {
  &__content {
    min-height: calc(100vh - 140px);
  }
}
</style>
