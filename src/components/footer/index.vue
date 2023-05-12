<template>
  <footer class="footer__wrapper">
    <div class="footer">
      <blockquote>
        <p>© Познавай, создавай</p>
      </blockquote>
      <nav>
        <p>
          mail:
          <a href="mailto:sattor1@list.ru">sattor1@list.ru</a>
        </p>
        <p>
          tel:
          <a href="tel:7-977-817-11-90">+7 (977)-817-11-90</a>
        </p>
      </nav>
    </div>
  </footer>
</template>
<script setup lang="ts">
const links = [
  { name: 'Таблица', code: 'table', path: '/table' },
  { name: 'Посты', code: 'posts', path: '/posts' },
  { name: 'Калькулятор', code: 'calculator', path: '/calculator' }
]
</script>
<style lang="scss">
.footer__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  background: $blue;
  @include font('ProximaNova Regular', 16px);
}

.footer {
  max-width: 1100px;
  width: 100%;
  height: 70px;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1:hover {
    cursor: crosshair;
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
