<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div v-for="post in posts" :key="post.id" class="card">
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
              <p class="subtitle is-6 has-text-centered post-date">
                Updated on <time :datetime="post.updated_at | HTMLDate" itemprop="dateModified">{{ post.updated_at | formatDate }}</time>&nbsp; by
                <span class="post-author has-text-centered" itemtype="http://schema.org/Person" itemscope="itemscope" itemprop="author">
                  <a rel="author" itemprop="url" :href="'/author/' + post.primary_author.slug">
                    {{ post.primary_author.name }}
                  </a>
                </span>
              </p>
            </div>
            <div class="content">
              <div class="subtitle is-6 has-text-centered post-tags">
                <p>
                  Tagged at <a :href="'/tag/' + post.primary_tag.slug">{{ post.primary_tag.name }}</a>
                </p>
              </div>
              <div class="buttons is-centered">
                <nuxt-link :key="post.id" :to="'/' + post.slug" class="button is-rounded is-warning read-more">
                  Open image
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
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
  .read-more {
    font-weight: 600;
    font-size: 18px;
  }
  .post-date {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
}
.post-author {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
}
.post-tags {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
}
</style>
