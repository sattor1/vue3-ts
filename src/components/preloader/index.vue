<template>
  <!-- <div class="preloader"></div> -->
  <div
    :style="{
      width: !props.width ? '55px' : props.width + 'px',
      height: !props.height ? '55px' : props.height + 'px'
    }"
    class="loader"
  ></div>
</template>
<script setup lang="ts">
const props = defineProps<{
  width?: number
  height?: number
}>()
</script>
<style lang="scss">
.loader {
  border: 10px solid;
  border-color: $blue-light transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
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
