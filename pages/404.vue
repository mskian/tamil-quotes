<template>
  <div class="error-container">
    <h1 class="title is-4 has-text-centered">
      Page not found
    </h1>
    <div class="buttons is-centered">
      <nuxt-link to="/" tag="a" class="button is-danger is-rounded">
        Go Home
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: '404Page'
}
</script>

<style scoped>
.error-container {
  margin-top: 9em;
  margin-bottom: 9em;
}
</style>
