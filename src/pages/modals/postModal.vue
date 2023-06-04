<template>
  <Preloader :width="200" :height="200" class="post-modal__loading" v-if="loading" />
  <SModal v-else :loading="loading" class="post-modal">
    <template v-slot:header>
      <h1 class="post-modal__title">Пост № {{ post?.id }}</h1>
    </template>
    <template v-slot:body>
      <h2>{{ post?.title }}</h2>
      <h3 :style="{ marginTop: '20px' }">Body:</h3>
      <p>{{ post?.body }}</p>
      <h3 :style="{ marginTop: '20px' }">Tags:</h3>
      <div class="post-modal__tags">
        <span class="post-modal__tags-tag" v-for="(tag, idx) in post?.tags" :key="tag + idx">{{ tag }}</span>
      </div>
    </template>
    <template v-slot:footer>
      <SButton @click="$emit('close')">Закрыть</SButton>
    </template>
  </SModal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchLists } from '@/stores/lists'
interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

const route = useRoute()
const fetch = fetchLists()
const post = ref<Post>()
const loading = ref(true)

watch(route, async val => {
  if (val.params?.id) post.value = await fetch.getPost(+route.params.id)
  loading.value = false
})
</script>
<style lang="scss">
.post-modal {
  &__title {
    font-size: 31px;
  }

  &__loading {
    position: absolute;
    left: 45%;
    top: 45%;
  }

  &__tags {
    display: flex;
    gap: 10px;
    margin-left: 50px;

    &-tag {
      background: $gray;
      padding: 2px 10px;
      border-radius: 40px;
      color: $white;
    }
  }
}
</style>
