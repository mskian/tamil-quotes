<template>
  <div>
    <nuxt-link v-for="post in posts" :key="post.id" :to="'/' + post.slug" tag="div" class="card">
      <div v-if="post.feature_image" class="card-image">
        <figure class="image">
          <img :src="post.feature_image" alt="Tamil Quotes">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="is-title has-text-centered">
            {{ post.title }}
          </h3>
          <p class="subtitle is-6 has-text-centered">
            Published on {{ post.updated_at | formatDate }}
          </p>
        </div>
        <div v-for="author in post.authors" :key="author.id">
          <p class="subtitle is-6 has-text-centered">
            Posted by 📝
            <nuxt-link :to="'/author/' + author.slug">
              {{ author.name }}
            </nuxt-link>
          </p>
        </div>
        <div class="content">
          <div class="subtitle is-6 has-text-centered">
            <p>
              Tagged at
              <nuxt-link v-for="tag in post.tags" :key="tag.id" :to="'/tag/' + tag.slug">
                {{ tag.name }}
              </nuxt-link>
            </p>
          </div>
          <div class="buttons is-centered">
            <nuxt-link :key="post.id" :to="'/' + post.slug" class="button is-primary">
              Read More
            </nuxt-link>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div class="level is-mobile" role="navigation">
      <p v-if="pagination.prev" class="level-item has-text-centered">
        <nuxt-link :to="prevLink" class="button is-info">
          Prev
        </nuxt-link>
      </p>
      <p class="level-item has-text-centered">
        Page {{ pagination.page }} of {{ pagination.pages }}
      </p>
      <p v-if="pagination.next" class="level-item has-text-centered">
        <nuxt-link :to="nextLink" class="button is-info">
          Next
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    indexBase: {
      type: String,
      required: false,
      default: '/'
    }
  },
  computed: {
    prevLink () {
      if (this.pagination.prev === 1) {
        return this.indexBase
      } else {
        return this.indexBase + 'page/' + this.pagination.prev
      }
    },
    nextLink () {
      return this.indexBase + 'page/' + this.pagination.next
    }
  }
}
</script>

<style scoped>
  .card {
    margin: 1.5em 0 1.5em 0;
    cursor: pointer;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  figure {
    margin: 1em auto;
  }
  .content {
    margin-top: 1em;
  }
</style>
