<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Made</strong> by <a href="https://www.facebook.com/sandyarmy" target="_blank" rel="nofollow noopener">Santhosh Veer</a>
      </p>
      <p>
        Nuxt.js 🔥 + vue.js 🦄 + Ghost Content API 📦
      </P>
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
