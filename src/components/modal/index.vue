<template>
  <div class="modal__backdrop">
    <div class="modal">
      <header class="modal__header">
        <slot name="header" />
        <SButton v-if="closeButton" class="modal__btn-close" @click="$emit('close')">X</SButton>
      </header>

      <section class="modal__body">
        <slot name="body" />
      </section>

      <footer class="modal__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  width?: number
  height?: number
  closeButton?: boolean
}>()
</script>
<style lang="scss">
.modal {
  background: $white;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 800px;
  @include font('ProximaNova Regular', auto);

  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__header,
  &__footer {
    padding: 15px;
  }

  &__footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 0;
    left: 0;
  }

  &__body {
    position: relative;
    padding: 0 15px 15px 15px;
  }
  &__btn-close {
    position: absolute;
    top: 10px;
    right: 10px;

    font-size: 20px;
    background: transparent;
  }
}
</style>
