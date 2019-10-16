<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Made</strong> by <a href="https://www.facebook.com/sandyarmy" target="_blank" rel="nofollow noopener">Santhosh Veer</a>
      </p>
      <p>Nuxt.js 🔥 + vue.js 🦄 + Ghost Content API 📦</P>
      <figure class="is-flex is-inline-block">
        <img src="https://api.netlify.com/api/v1/badges/182731b7-71de-4c7e-add3-a73907e60f34/deploy-status" alt="Tamil Quotes">
      </figure>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>
