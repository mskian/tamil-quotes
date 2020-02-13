<template>
  <div>
    <Navigation :settings="siteSettings" />
    <nuxt />
    <Footer :settings="siteSettings" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Footer,
    Navigation
  },
  computed: {
    siteSettings() {
      return this.$store.state.siteSettings
    }
  },
  mounted() {
    const cookiesAllowed = localStorage.getItem('cookiesAllowed') === 'yes'
    if (!cookiesAllowed) {
      this.$toast.show('We use cookies', {
        iconPack: 'fontawesome',
        icon: 'bullhorn',
        position: 'bottom-center',
        duration: 5000,
        theme: 'toasted-primary',
        action: [
          {
            text: 'Dismiss',
            onClick: (e, toastObject) => {
              localStorage.setItem('cookiesAllowed', 'yes')
              toastObject.goAway(0)
            }
          }
        ]
      })
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: this.siteSettings.twitter
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://tamilquotes.xyz' + this.$route.path
        }
      ]
    }
  }
}
</script>
