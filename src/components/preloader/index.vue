<template>
  <div class="loader__container">
    <div
      :style="{
        width: !props.width ? '55px' : props.width + 'px',
        height: !props.height ? '55px' : props.height + 'px'
      }"
      class="loader"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
}>()
</script>
<style lang="scss">
.loader {
  border: 25px solid;
  border-color: $blue-light transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
