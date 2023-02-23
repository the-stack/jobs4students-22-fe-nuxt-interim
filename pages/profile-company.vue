<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container>
        <v-row class="my-2 my-sm-5 my-md-8" justify="center">
          <v-col cols="12" sm="8">
            <v-card class="pa-5" color="transparent" flat>
              <h1 class="text-h1 text-md-h1 text-center">
                <span class="text--accent">Hi {{ firstname }}!</span><br>
                <span class="text-h1 text-md-h1 text--black">Schön dich hier zu haben!</span>
              </h1>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet color="transparent">
      <v-container>
        <v-row>
          <v-col cols="12" class="px-0">
            <v-expansion-panels popout v-model="expansion">

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===0}">Benutzer-Profil</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="profileCompleted">Vollständig</span>
                      <span class="text--error" v-else>unvollständig</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-profile v-bind:is-company="true"></profile-profile>

                  <v-row dense>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn color="primary"
                             :disabled="!unsaved.profile"
                             large
                             class="text--font text-none font-weight-black"
                             @click="saveStep">
                        Speichern
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===1}">Firmen-Profil</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="companyCompleted">Vollständig</span>
                      <span class="text--error" v-else>unvollständig</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-company></profile-company>

                  <v-row dense>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn color="primary"
                             :disabled="!unsaved.profile"
                             large
                             class="text--font text-none font-weight-black"
                             @click="saveStep">
                        Speichern
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===2}">Stellen-Abonnement<span v-if="userData.company && userData.company.abo_id && userData.company.has_active_abo">: {{userData.company.abo.title_i18n.de}}</span></v-col>
                    <v-spacer></v-spacer>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-abo></profile-abo>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h1': expansion===3}">Stellen</v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-vacancies></profile-vacancies>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===4}">Einstellungen</v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-settings></profile-settings>
                </v-expansion-panel-content>
              </v-expansion-panel>

            </v-expansion-panels>

          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions, mapMutations} from 'vuex'
import profileAbo from "@/components/profileAbo"
import profileProfile from "@/components/profileProfile"
import profileCompany from "@/components/profileCompany"
import profileVacancies from "@/components/profileVacancies"
import profileSettings from "@/components/profileSettings"


export default {
  name: 'profile',
  head() {
    return {
      title: 'Profil'
    }
  },
  data() {
    return {
      expansion: null,
      disabled: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.me.userData,
      firstname: state => state.me.userData.firstname,
      userData: state => state.me.userData,
      file: state => state.me.currentUpload.file,
      unsaved: state => state.me.unsaved,
      isLoggedIn: state => state.auth.isLoggedIn,
    }),
    ...mapFields({}),
    profileCompleted() {
      return this.user.email && this.user.firstname && this.user.lastname && this.user.gender_id;
    },
    companyCompleted() {
      return this.user.company && this.user.company.name && this.user.company.email && this.user.company.street1 && this.user.company.zip && this.user.company.city;
    },

  },
  mounted: function () {
    // check if there are any query params (tab to open)
    if (this.$route.query && this.$route.query.tab) {
      if (this.$route.query.tab === 'vacancies') { this.expansion = 3}
    }
  },
  methods: {
    ...mapActions({
      userUpdate: 'me/userUpdate',
    }),
    saveStep() {
      this.userUpdate().then(() => {
        this.$store.commit('me/resetUnsaved', 'profile')
      });
    },
  },
  components: {
    profileAbo,
    profileProfile,
    profileCompany,
    profileVacancies,
    profileSettings,
  }
}
</script>
