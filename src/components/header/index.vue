<template>
  <header class="header__wrapper">
    <div class="header">
      <h1 @click="$router.push({ path: '/' })">Sattor /></h1>
      <nav>
        <router-link :to="link.path" v-for="link of links" :key="link.code">{{ link.name }}</router-link>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
const links = [
  { name: 'Посты', code: 'posts', path: '/posts' },
  { name: 'Таблица', code: 'table', path: '/table' },
  { name: 'Калькулятор', code: 'calculator', path: '/calculator' }
]
</script>
<style lang="scss">
.header__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background: $blue-light;
  @include font('ProximaNova Regular', 16px);
}

.header {
  max-width: 1100px;
  width: 100%;
  height: 70px;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;

  @media (max-width: 1153px) {
    padding: 0 40px;
  }

  h1 {
    @include font('Montserrat Regular', 26px);

    &:hover {
      cursor: crosshair;
    }
  }

  nav {
    display: flex;
    gap: 20px;
    a {
      text-decoration: none;
      color: $white;
      transition: 0.3s;
      &:hover {
        color: $heavenly;
      }
    }
  }
}
</style>
