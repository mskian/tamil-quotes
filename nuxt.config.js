import { generateRoutes } from './util/ghost'
const pkg = require('./package')
require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    ghostUri: process.env.GHOST_URI,
    ghostKey: process.env.GHOST_KEY,
    siteUrl: 'https://quotes.tamilimages.xyz'
  },
  head: {
    // title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no, minimal-ui' },
      {
        name: 'X-UA-Compatible',
        content: 'IE=edge, chrome=1'
      },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'application-name',
        content: 'San Quotes'
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
        content: 'San Quotes'
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Catamaran:400,700&display=swap' },
      {
        rel: 'shortcut icon',
        href: '/icons/Icon-48.png'
      },
      {
        rel: 'apple-touch-icon',
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
    name: 'Tamil Quotes' // this is needed to change title for all PWA meta tags
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#e84b0d' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // See https://goo.gl/OOhYW5
    ['@nuxtjs/pwa'],
    ['nuxt-purgecss']
  ],
  manifest: {
    name: 'Tamil Quotes',
    short_name: 'Tamil Quotes',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    orientation: 'any'
  },
  workbox: {
    dev: false
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
