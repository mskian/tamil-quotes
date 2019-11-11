import { generateRoutes } from './util/ghost'
const pkg = require('./package')
require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    ghostUri: process.env.GHOST_URI,
    ghostKey: process.env.GHOST_KEY,
    siteUrl: 'https://tamilquotes.xyz'
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, minimal-ui' },
      {
        name: 'X-UA-Compatible',
        content: 'IE=edge, chrome=1'
      },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'google-site-verification', content: 'MB6fmsAtWxXiZBkMvNMHziNxqTCHWwPwZUfERaT0UQk' },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'application-name',
        content: 'Tamil Quotes'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'white-translucent'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Tamil Quotes'
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Catamaran:400,700&display=swap' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
        integrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossorigin: 'anonymous'
      },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://use.fontawesome.com' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://use.fontawesome.com' },
      {
        rel: 'shortcut icon',
        href: '/icons/Icon-48.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '48x48',
        href: '/icons/Icon-48.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/icons/Icon-72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '96x96',
        href: '/icons/Icon-96.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/Icons/Icon-144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/icons/Icon-192.png'
      }
    ]
  },
  /*
  ** Add overriding info for meta items
  */
  meta: {
    name: 'Tamil Quotes - தமிழ் கோட்ஸ் and Kavithai images' // this is needed to change title for all PWA meta tags
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e84b0d' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/filters.js' },
    { src: '~plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // See https://goo.gl/OOhYW5
    ['@nuxtjs/pwa'],
    ['nuxt-purgecss'],
    ['@nuxtjs/sitemap'],
    ['@nuxtjs/toast']
  ],
  sitemap: {
    hostname: 'https://tamilquotes.xyz'
  },
  manifest: {
    name: 'Tamil Quotes',
    short_name: 'Tamil Quotes',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    orientation: 'any'
  },
  workbox: {
    dev: false,
    runtimeCaching: [
      {
        urlPattern: 'https://images.tamilquotes.xyz/content/images/.*',
        handler: 'staleWhileRevalidate',
        strategyOptions: {
          cacheName: 'image-cache',
          cacheExpiration: {
            maxEntries: 30,
            maxAgeSeconds: 300
          },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },
  /*
  * Generate dynamic routes for static site generations
  */
  generate: {
    subFolders: false,
    routes: generateRoutes
  },
  /*
  ** Extend routes so multiple routes can use same component
  */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'PostIndex',
        path: '/page/:pageNumber',
        component: resolve(__dirname, 'pages/index.vue')
      })

      routes.push({
        name: 'TagIndex',
        path: '/tag/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/tag/_slug.vue')
      })

      routes.push({
        name: 'AuthorIndex',
        path: '/author/:slug/page/:pageNumber',
        component: resolve(__dirname, 'pages/author/_slug.vue')
      })
    }
  },
  purgecss: {},
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    // postcss: {
    //   preset: {
    //     features: {
    //       customProperties: true
    //     }
    //   }
    // },
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
