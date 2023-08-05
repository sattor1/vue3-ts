<template>
  <main class="main__wrapper">
    <section class="main">
      <h1>Ознокомление</h1>
      <p>
        Данный сайт писал и придумывал сам, без использования готовых шаблонов в figma.
        <br />
      </p>
      <h3>Разделы</h3>
      <ul>
        <li>
          <strong>Посты</strong>
          - используются данные взятые из
          <a class="main__link" target="_blank" href="https://dummyjson.com/docs/posts">dummyJSON</a>
        </li>
      </ul>
    </section>
  </main>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.main {
  overflow: hidden;
  height: 100%;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  &__wrapper {
    @include content-wrapper;
    background: $white;
  }

  h1 {
    @include font('ProximaNova Bold', 36px);
    margin-bottom: 10px;
  }
  h3 {
    @include font('ProximaNova Bold', 26px);
    margin: 20px 0;
  }
  p,
  li {
    @include font('Montserrat Regular', 21px);
  }

  &__link {
    background: $heavenly;
    color: $black;
  }
}
</style>
