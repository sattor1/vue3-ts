<template>
  <div class="pagination">
    <SButton :disabled="currentPage === 1" @click="prevPage">←</SButton>
    <SButton v-if="showStartEllipsis" @click="goToPage(1)">1</SButton>
    <SButton v-if="showStartEllipsis">...</SButton>
    <SButton v-for="page in visiblePages" :key="page" :disabled="currentPage === page" @click="goToPage(page)">
      {{ page }}
    </SButton>
    <SButton v-if="showEndEllipsis">...</SButton>
    <SButton v-if="showEndEllipsis" @click="goToPage(totalPages)">{{ totalPages }}</SButton>
    <SButton :disabled="currentPage === totalPages" @click="nextPage">→</SButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch, onMounted } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const props = defineProps<Props>()

const currentPage = ref(props.currentPage)
const totalPages = ref(props.totalPages)

onMounted(() => {
  if (localStorage.getItem('page')) {
    currentPage.value = +localStorage.getItem('page')
    props.onPageChange(currentPage.value)
  }
})

watch(currentPage, (val: any) => localStorage.setItem('page', val))

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    props.onPageChange(currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    props.onPageChange(currentPage.value)
  }
}

const visiblePages = computed(() => {
  const pages = []
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const showStartEllipsis = computed(() => {
  return visiblePages.value[0] > 1
})

const showEndEllipsis = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < totalPages.value
})

const goToPage = (page: number) => {
  currentPage.value = page
  props.onPageChange(currentPage.value)
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  gap: 13px;
  margin-top: 20px;
}
</style>
