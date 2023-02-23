<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container class="bg page-index" fluid>
        <v-row dense class="my-0 my-md-16 mx-0 mx-md-4">
          <v-col cols="12" sm="5" class="pa-0">
            <v-card class="pa-5 mt-4 mt-lg-16" color="#63C2CDDD">
              <h1 class="text-h4 text-md-h2 text--accent">
                {{ intro.title }}
              </h1>
              <nuxt-content :document="intro"/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="negative">
      <v-container>
        <v-row dense class="mt-0 mt-md-10 mb-md-16 mb-0">
          <v-col cols="12" md="7" class="mt-10 mt-md-0" order="2" order-md="1">
            <h2 class="text-h3 text-md-h2">Deine <span class="text--accent">Vorteile</span></h2>
            <v-list two-line dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Einmal registrieren und während dem <br> ganzen Studium profitieren
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Wir schlagen dir passende <br>Stellenangebote vor
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Super einfacher Bewerbungsprozess
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Wir begleiten dich persönlich auf dem <br> Weg in die Berufswelt
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="5"  class="mt-16 mt-lg-n16" order="1" order-md="2">

            <signup-form role="1" v-if="!userData.id"></signup-form>
            <v-card class="mt-n16" v-else>
              <v-card-title>
                <h3 class="text-h1">Hallo!</h3>
              </v-card-title>

              <v-card-text>
                Du bist aktuell als <strong class="text--accent">"{{ userData.firstname }} {{ userData.lastname }}"</strong> angemeldet. Falls du dich mit einem
                anderen Login anmelden möchtest, dann <router-link to="/login" class="text--accent">klicke hier.</router-link>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
        <v-row justify="center" class="mb-0 mb-md-16">
          <v-col cols="auto">
            <v-btn link
                   dark
                   to="/references"
                   class="text-none py-6 my-10"
                   :class="{'text-h5':!isMobile}"
                   color="primary">
              <span class="text--negative">Wir lieben ehrliches Feedback</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet color="disabled" align="center" justify="center" height="600px" class="py-16">
      <v-container>

        <v-row justify="center">
          <v-col cols="auto" class="mb-5">
            Jobs4Students AG - Balzers (FL) & Buchs SG<br>
            Telefon +423 237 55 75 / +41 81 300 14 55 / Mail: <a href="mailto:info@jobs4students.ch">info@jobs4students.ch</a>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="auto">
            <h2 class="text-h2">Partner</h2>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="6" sm="3">
            <a href="https://careers.hilti.com/en/students-and-recent-graduates" target="_blank">
              <v-img contain
                     max-width="90%"
                     :src="require('@/assets/img/hilti_logo.png')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3">
            <a href="https://www.swarovskigroup.com/S/careers/WorkAtSwarovski.de.html" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/j4s-partner-swarovski.png')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3">
            <a href="https://innovatis.net" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/logo_innovatis_interimag.svg')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3">
            <a href="https://the-stack.dev" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/theStack_logo_coding-black.svg')"></v-img>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'home',
  head() {
    return {
      title: "jobs4students",
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      userData: state => state.me.userData,
    }),
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    isMdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  },
  async asyncData({$content, params}) {
    const intro = await $content('_index/intro').fetch()
    return {
      intro,
    }
  },
  methods:{

  },
}
</script>
