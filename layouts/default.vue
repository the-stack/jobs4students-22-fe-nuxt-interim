<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"
                         v-show="isSmAndDown"
                         :width="!isMobile?'40%':'80%'"
                         temporary
                         app
                         right>
      <v-card flat tile>
        <v-card-title class="px-0 my-4 negative">
          <v-btn text
                 :ripple="false"
                 link to="/"
                 tile color="negative">
            <v-img contain
                   max-width="210px"
                   max-height="80px"
                   :src="require('@/assets/img/logo_innovatis-interim.svg')"></v-img>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
          <v-list tile flat>
            <v-list-item
              v-if="userid && userData.role_id===1"
              link to="/profile-student" exact-active-class="text--accent font-weight-bold"
            >
              <v-list-item-title>Profil bearbeiten</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="userid && userData.role_id===2"
              link to="/profile-company" exact-active-class="text--accent font-weight-bold"
            >
              <v-list-item-title>Profil bearbeiten</v-list-item-title>
            </v-list-item>
            <!--
            <v-list-item
              v-if="!userid"
              link to="/companies" exact-active-class="text--accent font-weight-bold">
              <v-list-item-title>Für Unternehmen</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="!userid"
              link to="/students" exact-active-class="text--accent font-weight-bold">
              <v-list-item-title>Für Studenten</v-list-item-title>
            </v-list-item>
             -->
            <v-list-item link to="/jobs" exact-active-class="text--accent font-weight-bold">
              <v-list-item-title>Stellen</v-list-item-title>
            </v-list-item>

            <v-list-item link to="/login" exact-active-class="text--accent font-weight-bold" v-if="!userid">
              <v-list-item-title>Anmelden</v-list-item-title>
            </v-list-item>
            <!--
            <v-list-item link to="/contact" exact-active-class="text--accent font-weight-bold">
              <v-list-item-title>Kontakt</v-list-item-title>
            </v-list-item>
            -->
            <v-list-item v-show="isMobile" link to="/terms" exact-active-class="text--accent font-weight-bold">
              <v-list-item-title>Rechtliches</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutDialogOpen" exact-active-class="text--accent font-weight-bold" v-if="userid">
              <v-list-item-title>Abmelden</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar app flat color="disabled" height="70px">
      <v-btn text
             :ripple="false"
             link to="/"
             tile
             class="px-0"
             color="transparent">
        <v-img contain
               position="start start"
               max-width="210px"
               max-height="56px"
               :src="require('@/assets/img/logo_innovatis-interim.svg')"></v-img>
      </v-btn>
      <v-spacer></v-spacer>
<!--
      <v-btn v-show="!isSmAndDown"
             v-if="!userid"
             text
             link
             height="64px"
             tile
             :ripple="false"
             to="/students"
             class="text-none">{{ $tc('nav.pages.students') }}
      </v-btn>
      <v-btn v-show="!isSmAndDown"
             v-if="!userid"
             text
             link
             height="64px"
             tile
             :ripple="false"
             to="/companies"
             class="text-none">{{ $tc('nav.pages.companies') }}
      </v-btn>
      -->
      <v-btn v-show="!isSmAndDown"
             text
             link
             height="64px"
             tile
             :ripple="false"
             to="/jobs"
             class="text-none">{{ $tc('nav.pages.vacancies') }}
      </v-btn>

      <v-btn v-show="!isSmAndDown"
             v-if="!userid"
             text
             link
             height="64px"
             tile
             :ripple="false"
             to="/login"
             class="text-none">{{ $tc('nav.pages.login') }}
      </v-btn>
<!--
      <v-btn v-show="!isSmAndDown"
             text
             link
             height="64px"
             tile
             :ripple="false"
             to="/contact"
             class="text-none">{{ $tc('nav.pages.contact') }}
      </v-btn>
-->

      <div class="text-center">
        <v-menu
          v-if="userData.id && !isSmAndDown"
          open-on-hover
          bottom
          offset-y
          tile
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="text-none"
              color="black"
              dark
              v-bind="attrs"
              v-on="on"
              tile
              height="64px"
              text
              @click="goToProfile"
            >
              <span v-if="!isSmAndDown">{{userData.firstname}}</span>
              <v-avatar
                class="ml-4"
                size="36">
                <img
                  v-if="userData.dossier.profilepicture"
                  :src="userData.dossier.profilepicture.publicurl"
                >
                <v-icon
                  v-else>
                  mdi-face
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list

          >
            <v-list-item
              v-if="userid && userData.role_id===1"
              to="/profile-student"
            >
              <v-list-item-title>Profil bearbeiten</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-else
              to="/profile-company"
            >
              <v-list-item-title>Profil bearbeiten</v-list-item-title>
            </v-list-item>

            <v-list-item
              @click="logoutDialogOpen"
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>


        </v-menu>
      </div>

      <v-app-bar-nav-icon class="text--primary" v-show="isSmAndDown" @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>

    <v-snackbar
      :color="snackbar.color"
      v-model="snackbarStatus"
      :timeout="timeout"
    >
      {{ snackbar.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="negative"
          text
          v-bind="attrs"
          @click="snackbarStatus = false"
        >
          Schliessen
        </v-btn>
      </template>
    </v-snackbar>


    <!-- Logout-Dialog -->
    <v-row justify="center">

      <v-dialog
        v-model="logoutDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Logout
          </v-card-title>

          <v-card-text>
            Möchtest du dich wirklich abmelden?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="secondary"
              text
              @click="logoutDialog = false"
            >
              Nein
            </v-btn>

            <v-btn
              color="error"
              text
              @click="logoutDialogExecute"
            >
              Ja
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar
      v-model="emailVerifiedShow"
      :timeout="emailVerifiedTimeout"
    >
      {{emailVerifiedText}}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-if="emailVerifiedSendButton"
          color="negative"
          text
          v-bind="attrs"
          @click="resendEmailVerification()"
        >
          senden
        </v-btn>
      </template>
    </v-snackbar>
    <v-footer app :height="!isMobile ? '64px': '100px'" color="disabled">
      <v-row align="center" dense>
        <v-col cols="12" sm="auto" class="pa-0">
          <v-row dense align="center">
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-btn color="secondary" plain link href="https://www.innovatis.net/" target="_blank">Powered by
                Innovatis
              </v-btn>
            </v-col>
            <v-col cols="auto" v-show="!isMobile">
              <v-btn color="secondary" plain link to="/terms">{{ $tc('nav.pages.terms') }}</v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="auto" class="pa-0">
          <v-row dense align="center">
            <v-spacer></v-spacer>
            <v-col cols="auto" class="pa-0">
              <v-img contain
                     height="12px"
                     :src="require('@/assets/img/s-cross.svg')"></v-img>
            </v-col>
            <v-col cols="auto" class="text-button text--accent">made in Switzerland, v2</v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-footer>

  </v-app>
</template>

<script>

import {mapFields} from "vuex-map-fields";
import {mapActions, mapState, mapMutations} from "vuex";

export default {
  name: 'jobs4students',
  data: () => ({
    drawer: false,
    timeout: 5000,
    logoutDialog: false,
    // E-Mail Verification Snackbar
    emailVerifiedSendButton: true,
    emailVerifiedTimeout: -1,
    emailVerifiedText: "Dein Account wurde erstellt aber noch nicht verifiziert. Um ein Dossier einzureichen muss deine E-Mail Adresse verifiziert werden. Bei Bedarf kann dieses nochmals zugestellt werden.",
  }),
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,

      userid: state => state.me.userData.id,
      userData: state => state.me.userData,
    }),
    ...mapFields({
      snackbarStatus: 'snackbar.status',
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
    emailVerifiedShow: {
      get: function () {
        return (this.userData.id && !this.userData.email_verified_at && this.$route.path!=='/email-verify')
      },
      // setter
      set: function (newValue) {

      }
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    ...mapMutations({

    }),
    logoutDialogOpen: function () {
      this.logoutDialog = true
    },
    logoutDialogExecute: function () {
      this.logout();
      this.logoutDialog = false
    },
    goToProfile: function () {
      if (this.userid && this.userData.role_id===1) {
        this.$router.push({path: '/profile-student'});
      } else {
        this.$router.push({path: '/profile-company'});
      }


    },
    resendEmailVerification: function () {
      this.$store.dispatch('me/resendEmailVerification').then(response => {
        console.log(response)
        if (response.data && response.data.data.resendEmailVerification) {
          this.emailVerifiedText = 'Das Aktivierungsmail wurde nochmals gesendet - bitte überpüfe deinen Mail-Eingang.'
          this.emailVerifiedSendButton = false
          this.emailVerifiedTimeout = 5000
        } else {
          this.emailVerifiedText = 'Es gab einen Fehler beim Senden des Aktivierungsmails.'
        }
      }).catch(() => {
        this.emailVerifiedText = 'Es gab einen Fehler beim Senden des Aktivierungsmails.'
      });
    }
  },

};
</script>
