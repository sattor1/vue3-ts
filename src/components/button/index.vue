<template>
  <button
    class="button"
    :class="{
      disabled: props.disabled
    }"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
}>()
</script>
<style lang="scss">
.button {
  border: 1px solid $heavenly;
  padding: 5px 10px;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition: all 500ms ease;

  &:hover {
    background: $blue-light;
    color: $white;
    border: 1px solid $blue-light;
  }
}
.disabled {
  color: #666666;
  border: 1px solid #999999;
  cursor: default;

  &:hover {
    background: #fff;
    color: #666666;
    border: 1px solid $heavenly;
    pointer-events: none;
  }
}
</style>
