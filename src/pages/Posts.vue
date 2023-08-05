<template>
  <section class="section__wrapper">
    <Preloader :height="200" :width="200" class="section__preloader" v-if="loading" />

    <section v-else class="section">
      <div class="section__title">
        <h1>Посты с серверной пагинацией</h1>
        <p>
          {{ !isSearching ? 'Всего:' : 'Найдено:' }}
          <strong>{{ !isSearching ? pagination.total : data.posts.length }}</strong>
        </p>
      </div>

      <div class="section__search">
        <SInput
          v-model="search"
          type="text"
          placeholder="Поиск..."
          @keydown.enter="searching(search)"
          @input="checkNoResult(search)"
        />
        <SButton :disabled="search.length < 3" @click="searching(search)">Поиск</SButton>
      </div>

      <div v-if="data.posts?.length" class="section__posts">
        <article v-for="post in data.posts" :key="post.id" class="section__posts__post">
          <div>
            <p>
              <strong>Название:</strong>
              {{ post.title }}
            </p>
            <p :title="post.body">
              <strong>Описание:</strong>
              {{ maxSymbols(post.body, 300) }}
            </p>
          </div>

          <div class="section__posts__post-buttons">
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
        :save-url="{ ...pagination, search }"
      />
    </section>

    <Modal v-if="showModal" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { fetchLists } from '@/stores/lists'
import SPagination from '@/components/pagination/index.vue'
import Modal from './modals/postModal.vue'
import { useRoute, useRouter } from 'vue-router'
import urlData from '@/plugins/urlData'
import text from '@/plugins/text'

interface Post {
  id: number
  title: string
  body: string
}
interface Data {
  limit: number
  posts: Post[]
  skip: number
  total: number
}
const router = useRouter()
const route = useRoute()
const fetch = fetchLists()
const createUrl = urlData.methods?.createUrl
const maxSymbols = text.methods?.maxSymbols
const loading = ref(true)
const data = ref<Data>({
  limit: 0,
  posts: [],
  skip: 0,
  total: 0
})
const search = ref<string>('')
const showModal = ref<boolean>(false)
const isSearching = ref<boolean>(false)
const pagination = reactive({
  limit: 9,
  skip: 0,
  page: 1,
  total: 0
})

onMounted(async () => {
  // ↓ для стягивания полного списка постов
  // data.value = await fetch.allPosts()
  data.value = await fetch.getLimitPosts(pagination.limit, pagination.skip)
  pagination.total = data.value.total
  loading.value = false
})

watch(
  () => pagination.page,
  async page => {
    const skip = (page - 1) * pagination.limit
    data.value = await fetch.getLimitPosts(pagination.limit, skip)
  },
  { immediate: false, deep: true }
)

watch(
  () => route.params.id,
  id => {
    if (id) {
      showModal.value = true
      router.push({ name: 'post-item', params: { id: id } })
    }
  },
  { immediate: true }
)

// METHODS
const onPageChange = (page: number) => {
  pagination.page = page
  // ↓ для хранения данных в url
  // if (createUrl) createUrl(router, { ...pagination, search: search.value }, 'posts')
}

const openPost = (post: Post): void => {
  showModal.value = true
  router.push({ name: 'post-item', params: { id: post.id } })
}

const deletePost = async (post: Post) => {
  loading.value = true
  await fetch.deletePost(post.id)
  loading.value = false
}
const searching = async (str: string) => {
  loading.value = true
  data.value = await fetch.searchPosts(str)
  isSearching.value = true
  // ↓ для хранения данных в url
  // if (createUrl) createUrl(router, { ...pagination, search: search.value }, 'posts')
  loading.value = false
}
const closeModal = () => {
  showModal.value = false
  router.push({ name: 'posts' })
}
const checkNoResult = async (str: string) => {
  if (!str) {
    data.value = await fetch.getLimitPosts(pagination.limit, pagination.skip)
    isSearching.value = false
  }
}
</script>

<style lang="scss">
.section {
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
    transition: 0.3s;

    @media (max-width: 1153px) {
      padding: 0 40px;
    }

    h1 {
      @include font('ProximaNova Bold', 36px);
      transition: 0.3s;
      @media (max-width: 594px) {
        font-size: 26px;
      }
    }

    p {
      @include font('ProximaNova Regular', 16px);
      color: $dark-gray;
    }
    strong {
      color: $black;
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
    transition: 0.3s;

    @media (max-width: 1153px) {
      padding: 0 40px;
    }

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
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    @include font('ProximaNova Regular', 15px);
    transition: 0.3s;

    @media (max-width: 1153px) {
      padding: 0 40px;
    }
    @media (max-width: 850px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 594px) {
      grid-template-columns: repeat(1, 1fr);
    }

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
        gap: 10px;
      }
    }
  }
}
</style>
@/plugins/urlData@/plugins/text
