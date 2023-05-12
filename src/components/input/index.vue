<template>
  <input v-model="value" class="input" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style lang="scss">
input {
  height: 30px;
  max-width: 400px;
  width: 100%;
  padding: 0 10px;
  border: 1px solid $heavenly;

  &:focus-visible {
    outline: none;
    border: 1px solid $blue-light;
    border-radius: 0px;
  }
}
</style>
