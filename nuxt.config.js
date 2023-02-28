import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

export default {

  target: 'static',

  generate: {
    fallback: true,
    // Rolf: required to render the vacancies pages
    routes() {
      let query = `{
                            vacancies (published: true)
                              {
                                id
                                user_id
                                company_id
                                title
                                workplace
                                vacancytype {
                                  id
                                  title_i18n {
                                    de
                                  }
                                }
                                created_at
                              }
                  }`
      return axios.post(process.env.NUXT_ENV_LARAVEL_GRAPHQL, {query: query}).then(res => {
        return res.data.data.vacancies.map(vacancy => {
          return '/job/' + vacancy.id
        })
      })
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - jobs4students',
    title: 'jobs4students',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'og:title', property: 'og:title', content: 'jobs4students'},
      {hid: 'og:type', property: 'og:type', content: 'website'},
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Dein Einstieg in die Arbeitswelt.',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'jobs4students.ch',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '~/static/og-images/jobs4students.svg',
      },
      {
        name: 'keywords',
        content: 'Stellen, Jobs, Einstieg, Ferienjobs, Ausbildung, Studium,',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Ob Ferienjob, Praktikum oder Nebenjob, wir suchen für dich die passenden Studentenjobs.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/fontComfortaa.css',
    '@assets/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],

  router: {
    middleware: ['loader', 'auth', 'vacancies']
  },

  ssr: false,

  i18n: {
    /* module options */
    langDir: '~/locales/',
    locales:
      [
        { code: 'de', iso: 'de-CH', file: 'de.json', dir: 'ltr' }
      ],
    defaultLocale: 'de',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#31417b',
          primaryLight:'#c8cfe9',
          accent: '#98874f',
          fontPrimary: '#31417b',
          secondary: '#31417b',
          info: '#51831B',
          warning: '#D18F23',
          error: '#BF1B2D',
          success: '#60A515',
          negative:'#FFFFFF',
          disabled: '#EEEEEE',
          disabled_dark: '#9F9F9F',
          font:'#3A4347',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //publicPath: 'dist/de/',
  }
}
