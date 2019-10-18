<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3 has-text-centered">
        {{ siteSettings.title }}
      </h1>
      <h2 class="subtitle has-text-centered bio-author">
        {{ siteSettings.description }}
      </h2>
      <PostList :posts="indexPosts" :pagination="indexPagination" />
    </div>
  </section>
</template>

<script>
import PostList from '@/components/PostList.vue'
export default {
  name: 'PostIndex',
  components: {
    PostList
  },
  computed: {
    indexPosts () {
      return this.$store.state.indexPosts
    },
    indexPagination () {
      return this.$store.state.indexPagination
    },
    siteSettings () {
      return this.$store.state.siteSettings
    }
  },
  head () {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: this.siteSettings.cover_image }
      ]
    }
  },
  async fetch ({ params, store, error, payload }) {
    if (payload) {
      store.commit('setIndexPosts', payload)
    } else {
      let pageNumber = 1
      if (params.pageNumber) {
        pageNumber = params.pageNumber
      }

      try {
        await store.dispatch('getIndexPosts', {
          filter: '',
          // eslint-disable-next-line object-shorthand
          pageNumber: pageNumber
        })
      } catch (e) {
        // as far as user is concerned this isn't an API failure
        error({ statusCode: 404, message: e.message })
      }
      // remember to use await here so data will be available
    }
  }
}
</script>
