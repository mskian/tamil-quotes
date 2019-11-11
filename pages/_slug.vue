<template>
  <section class="section" itemtype="https://schema.org/CreativeWork" itemscope>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="container post-container content">
          <h1 class="title has-text-weight-bold has-text-centered has-text-primary" itemprop="headline">
            {{ post.title }}
          </h1>
          <figure v-if="post.feature_image" class="post-feature-image">
            <img :src="post.feature_image" :alt="post.title" itemprop="image">
          </figure>
          <p class="has-text-centered post-date">
            Updated on <time :datetime="post.updated_at | HTMLDate" itemprop="dateModified">{{ post.updated_at | formatDate }}</time>&nbsp; by
            <span
              v-for="author in post.authors"
              :key="author.id"
              class="post-author has-text-centered"
              itemtype="http://schema.org/Person"
              itemscope="itemscope"
              itemprop="author"
            >
              <a rel="author" itemprop="url" :href="'/author/' + post.primary_author.slug">
                <span itemprop="name">{{ post.primary_author.name }}</span>
              </a>
            </span>
          </p>
          <br>
          <article ref="postContent" class="post-content" itemprop="text" v-html="post.html" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'PostPage',
  async fetch ({ params, store, error, payload }) {
    if (payload) {
      store.commit('setCurrentPost', payload)
    } else {
      // remember to use await here so data will be available
      // await store.dispatch('getCurrentPost', params.slug)
      const postLinks = store.state.postNav.find(post => post.slug === params.slug)

      if (!postLinks) {
      // if it's not in lists of posts check for page
      // TODO: catch errors
        try {
          const page = await ghostAPI().pages.read({
            slug: params.slug,
            include: 'tags,authors'
          })
          store.commit('setCurrentPost', page)
        } catch (e) {
          // forward error - just call all errors 404
          // since user doesn't need to know about content API
          error({ statusCode: 404, message: e.message })
        }
      } else {
        try {
          const post = await ghostAPI().posts.read({
            slug: params.slug,
            include: 'tags,authors'
          })

          store.commit('setCurrentPost', {
            ...post,
            prevSlug: postLinks.prevSlug,
            nextSlug: postLinks.nextSlug
          })
        } catch (e) {
          error({ statusCode: 404, message: e.message })
        }
      }
    }
  },
  computed: {
    post () {
      return this.$store.state.currentPost
    },
    siteSettings () {
      return this.$store.state.siteSettings
    }
  },
  mounted () {
    // ghetto way of overcoming iFrame height "challenge/annoyance"
    const cards = document.getElementsByClassName('kg-embed-card')
    for (const card of cards) {
      const iframe = card.firstElementChild
      const iframeHeight = iframe.getAttribute('height')
      if (iframeHeight) {
        iframe.style.height = iframeHeight + 'px'
      }
    }
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.meta_description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.post.og_title || this.post.meta_title },
        { hid: 'og:description', property: 'og:description', content: this.post.og_description || this.post.meta_description },
        { hid: 'og:image', property: 'og:image', content: this.post.og_image || this.post.feature_image || this.siteSettings.cover_image },
        { hid: 'og:url', property: 'og:url', content: process.env.siteUrl + this.$route.path },
        { hid: 'twitter:title', name: 'twitter:title', content: this.post.twitter_title || this.post.meta_title || this.post.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.post.twitter_description || this.post.meta_description },
        { hid: 'twitter:image', name: 'twitter:image', content: this.post.twitter_image || this.post.feature_image || this.siteSettings.cover_image },
        { hid: 'twitter:url', name: 'twitter:url', content: process.env.siteUrl + this.$route.path },
        { hid: 'twitter:creator', name: 'twitter:creator', content: this.post.primary_author.twitter },
        { hid: 'twitter:label1', name: 'twitter:label1', content: 'Written by' },
        { hid: 'twitter:data1', name: 'twitter:data1', content: this.post.primary_author.name }
      ]
    }
  }
}
</script>

<style lang="scss">
  .button-link {
    display: inline-block;
    text-decoration: none;
    margin: 5px 0;
    padding: 10px 25px;
    color: #fff !important;
    font-size: 20px;
    line-height: 1.4;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 -1px 0 rgba(0,0,0,.1);
    background: linear-gradient(#4fb7f0,#29a0e0 60%,#29a0e0 90%,#36a6e2);
    border-radius: 3px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.14);
    -webkit-font-smoothing: subpixel-antialiased;
    font-family: 'Meera Inimai', sans-serif;
  }
  .button-link:hover {
  background: linear-gradient(#36a6e2,#29a0e0 60%,#29a0e0 90%,#4fb7f0);
  box-shadow: 0px 0px 5px 0 rgba(100, 100, 100, 0.5);
  }
  .button-link:active, .button-link:focus { background: #209cdf; color: #fff !important; }
  @media (max-width: 500px) {
    .button-link {
        margin: 10px 0 0 0;
        width: 100%;
    }
  }
  .post-date {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
    -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased !important;
   -moz-font-smoothing: antialiased !important;
   text-rendering: optimizelegibility !important;
}
.post-author {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
    -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased !important;
   -moz-font-smoothing: antialiased !important;
   text-rendering: optimizelegibility !important;
}
.post-tags {
    font-size: 12px;
    text-transform: uppercase;
    color: #000;
    font-weight: bold;
    -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased !important;
   -moz-font-smoothing: antialiased !important;
   text-rendering: optimizelegibility !important;
}
.post-container {
  display: flex;
  flex-direction: column;

  .post-feature-image {
    align-self: center;
    margin-bottom: 2em;
    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

}

.post-content {
    letter-spacing: .03em;
    word-wrap: break-word;
    font-family: 'Catamaran', sans-serif;
    font-size: 16px;
    color: #221f1f;
    -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased !important;
   -moz-font-smoothing: antialiased !important;
   text-rendering: optimizelegibility !important;
h2 {
  text-align: center;
}
  .instagram-media, .instagram-media-rendered {
    margin: auto !important;
  }

  .kg-image-card {
    align-self: center;
    .kg-image {
      max-width: 75vw;
    }
    figcaption {
      padding: 0 2em;
    }
  }

  .kg-width-wide {
    .kg-image {
      max-width: 85vw;
    }
  }

  .kg-width-full {
    .kg-image {
      max-width: 100vw;
    }
  }
  p {
    letter-spacing: .03em;
    word-wrap: break-word;
    font-family: 'Catamaran', sans-serif;
    font-size: 18px;
    color: #221f1f;
    -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased !important;
   -moz-font-smoothing: antialiased !important;
   text-rendering: optimizelegibility !important;
  }
  p {
    align-self: center;
    img {
      max-width: 85%;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
