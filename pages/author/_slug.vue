<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-3 has-text-centered">
        Posts by the Author: {{ currentAuthor.name }}
      </h1>
      <p class="subtitle is-5 has-text-centered bio-author">
        Bio: {{ currentAuthor.bio }}
      </p>
      <PostList :posts="indexPosts" :pagination="indexPagination" :index-base="'/author/' + currentAuthor.slug + '/'" />
    </div>
  </section>
</template>

<script>
import PostList from '@/components/PostList.vue'
export default {
  name: 'AuthorIndex',
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
    },
    currentAuthor () {
      return this.$store.state.siteAuthors.find(author => author.slug === this.$route.params.slug)
    }
  },
  async fetch ({ params, store, error, payload }) {
    if (payload) {
      store.commit('setIndexPosts', payload)
    } else {
      let pageNumber = 1
      if (params.pageNumber) {
        // eslint-disable-next-line object-shorthand
        pageNumber = params.pageNumber
      }

      try {
        // remember to use await here so data will be available
        await store.dispatch('getIndexPosts', {
          filter: 'author:' + params.slug,
          // eslint-disable-next-line object-shorthand
          pageNumber: pageNumber
        })
      } catch (e) {
        // as far as user is concerned this isn't an API failure
        error({ statusCode: 404, message: e.message })
      }
    }
  }
}
</script>
