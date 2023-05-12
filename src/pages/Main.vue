<template>
  <main class="main__wrapper">
    <Preloader :height="200" :width="200" class="main__preloader" v-if="loading" />

    <section v-else class="main">
      <div class="main__title">
        <h1>Посты с серверной пагинацией</h1>
        <p>
          Всего:
          <strong>{{ pagination.total }}</strong>
        </p>
      </div>

      <div class="main__search">
        <SInput
          v-model="search"
          type="text"
          placeholder="Поиск..."
          @keydown.enter="searching(search)"
          @input="checkNoResult(search)"
        />
        <SButton :disabled="search.length < 3" @click="searching(search)">Поиск</SButton>
      </div>

      <div v-if="data.posts?.length" class="main__posts">
        <article v-for="post in data.posts" :key="post.id" class="main__posts__post">
          <div>
            <p>
              <strong>Название:</strong>
              {{ post.title }}
            </p>
            <p>
              <strong>Описание:</strong>
              {{ post.body }}
            </p>
          </div>

          <div class="main__posts__post-buttons">
            <SButton @click="openPost(post)">Открыть</SButton>
            <SButton @click="deletePost(post)">Удалить</SButton>
          </div>
        </article>
      </div>
      <h2 v-else-if="search.length && !data.posts?.length">По вашему запросу ничего не найдено.</h2>
      <SPagination
        v-if="!search.length && data.posts?.length"
        :current-page="pagination.page"
        :total-pages="Math.ceil(pagination.total / pagination.limit)"
        :on-page-change="onPageChange"
      />
    </section>

    <Modal v-if="showModal" @close="closeModal" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { fetchLists } from '@/stores/lists'
import SPagination from '@/components/pagination/index.vue'
import Modal from './modals/postModal.vue'
import { useRoute, useRouter } from 'vue-router'

interface Posts {
  id: number
  title: string
  body: string
}
const router = useRouter()
const route = useRoute()
const fetch = fetchLists()
const loading = ref(true)
const data = ref<Posts[]>([])
const search = ref('')
const showModal = ref(false)
const pagination = reactive({
  limit: 9,
  offset: 0,
  page: 1,
  total: 0
})

onMounted(async () => {
  // data.value = await fetch.allPosts()
  data.value = await fetch.getLimitPosts(pagination.limit, pagination.offset)
  pagination.total = data.value.total
  loading.value = false
})

watch(
  () => pagination.page,
  async page => {
    const offset = (page - 1) * pagination.limit
    data.value = await fetch.getLimitPosts(pagination.limit, offset)
  },
  { immediate: false, deep: true }
)

// METHODS
const onPageChange = (page: number) => (pagination.page = page)

const openPost = (post: Posts): void => {
  showModal.value = true
  router.push({ name: 'post-item', params: { id: post.id } })
}

const deletePost = (post: Posts): void => {
  console.log(post)
}
const searching = async (str: string) => {
  loading.value = true
  data.value = await fetch.searchPosts(str)
  loading.value = false
}
const closeModal = () => {
  showModal.value = false
  router.push({ name: 'posts' })
}
const checkNoResult = async (str: string) => {
  if (!str) data.value = await fetch.getLimitPosts(pagination.limit, pagination.offset)
}
</script>

<style lang="scss">
.main {
  overflow: hidden;
  height: 100%;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      @include font('ProximaNova Bold', 36px);
    }

    p {
      @include font('ProximaNova Regular', 16px);
      color: #666666;
    }
    strong {
      color: black;
    }
  }
  h2 {
    @include font('ProximaNova Bold', 26px);
    margin-top: 20px;
  }
  &__wrapper {
    @include content-wrapper;
    background: $white;
  }

  &__preloader {
    position: absolute;
    left: 45%;
    top: 45%;
  }

  &__search {
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
    justify-content: flex-start;

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
  }

  &__posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    @include font('ProximaNova Regular', 15px);

    &__post {
      position: relative;
      padding: 20px;
      border: 1px solid $heavenly;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      transition: 0.3s;

      &:hover {
        border: 1px solid $blue-light;
        box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
      }

      p {
        margin-bottom: 10px;
      }

      &-buttons {
        display: flex;
        justify-content: flex-start;
        gap: 20px;
      }
    }
  }
}
</style>
