import { defineStore } from 'pinia'
import axios from 'axios'

export const fetchLists = defineStore('posts', {
  state: () => ({}),

  actions: {
    // get all posts
    async allPosts() {
      try {
        const payload = await axios.get('https://dummyjson.com/posts')
        return payload.data
      } catch (err: any) {
        console.error(err.message)
        return err
      }
    },
    // for pagination
    async getLimitPosts(limit: number, offset: number) {
      try {
        const payload = await axios.get(`https://dummyjson.com/posts?limit=${limit}&skip=${offset}&select=title,body`)
        return payload.data
      } catch (err: any) {
        console.error(err.message)
        return err
      }
    },
    // get one post
    async getOnePosts(id: number) {
      try {
        const payload = await axios.get(`https://dummyjson.com/posts/${id}`)
        return payload.data
      } catch (err: any) {
        console.error(err.message)
        return err
      }
    },
    // search posts
    async searchPosts(str: string) {
      try {
        const payload = await axios.get(`https://dummyjson.com/posts/search?q=${str}&select=title,body`)
        return payload.data
      } catch (err: any) {
        console.error(err.message)
        return err
      }
    }
  }
})
