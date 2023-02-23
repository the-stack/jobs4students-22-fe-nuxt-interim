<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container>
        <v-row class="my-4 my-sm-10 my-md-16">
          <v-col cols="12">
            <v-card>
              <v-container class="py-10">
                <v-row dense justify="space-between" align="center">
                  <v-col cols="12" sm="6">
                    <v-img contain
                           max-height="40vh"
                           :src="require('@/assets/img/Profil_Page.svg')"></v-img>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-row>
                      <v-col cols="12">
                        <span class="text-h4 text-md-h1">
                          Hi <span class="text--accent">{{ firstname }}</span> ! <br>
                          Schön dich hier zu haben!</span>
                      </v-col>
                      <v-col cols="12">
                        <p>Um für dich die passende Praktikumsstelle zu finden benötigen wir deine Hilfe.</p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
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
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===0}">Profil</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="profileCompleted">Vollständig</span>
                      <span class="text--error" v-else>unvollständig</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-profile></profile-profile>

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
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===1}">Ich suche</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="searchCompleted">Vollständig</span>
                      <span class="text--error" v-else>keine Angabe</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pb-10">
                  <profile-searching></profile-searching>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===2}">Kontaktdaten & Infos</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="contactCompleted">Vollständig</span>
                      <span class="text--error" v-else>unvollständig</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-address></profile-address>

                  <v-row dense>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn color="primary"
                             large
                             class="text--font text-none font-weight-black"
                             @click="userUpdate">
                        Speichern
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===3}">Ausbildung & berufliche Erfahrung</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="educationCompleted">Vollständig</span>
                      <span class="text--error" v-else>keine Angabe</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-qualification></profile-qualification>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===4}">Sprachen</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="languagesCompleted">Vollständig</span>
                      <span class="text--error" v-else>keine Angabe</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-language></profile-language>

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===5}">Skills</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="skillsCompleted">Vollständig</span>
                      <span class="text--error" v-else>keine Angabe</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-skills></profile-skills>
                  <v-row dense>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn color="primary"
                             large
                             class="text--font text-none font-weight-black"
                             @click="userUpdate">
                        Speichern
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="mb-6 elevation-8 j4s-expansion-panel">
                <v-expansion-panel-header class="font-weight-black">
                  <v-row align="center">
                    <v-col cols="auto" :class="{'text-h4 text-md-h2': expansion===6}">Unterlagen</v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto" class="mr-4">
                      <span class="text--success" v-if="uploadsCompleted">Vollständig</span>
                      <span class="text--error" v-else>keine Angabe</span>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <profile-uploads></profile-uploads>

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
import profileProfile from "@/components/profileProfile"
import profileSearching from "@/components/profileSearching"
import profileAddress from "@/components/profileAddress"
import profileQualification from "@/components/profileQualification"
import profileLanguage from "@/components/profileLanguage"
import profileSkills from "@/components/profileSkills"
import profileUploads from "@/components/profileUploads"
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
    }),
    ...mapFields({}),
    profileCompleted() {
      return this.user.email && this.user.firstname && this.user.lastname && this.user.gender_id;
    },
    searchCompleted() {
      return this.user.dossier ? this.user.dossier.availabilities && this.user.dossier.availabilities.length > 0: false;
    },
    educationCompleted() {
      return this.user.dossier ? this.user.dossier.qualifications && this.user.dossier.qualifications.length > 0 : false;
    },
    languagesCompleted() {
      return this.user.dossier ? this.user.dossier.languages && this.user.dossier.languages.length > 0 : false;
    },
    skillsCompleted() {
      return this.user.dossier ? this.user.dossier.skills : false;
    },
    uploadsCompleted() {
      return this.user.dossier ? this.user.dossier.files && this.user.dossier.files.length > 0 : false;
    },
    contactCompleted() {
      return this.user.dossier ? this.user.dossier.street1 && this.user.dossier.zip && this.user.dossier.city && this.user.dossier.country && this.user.dossier.phone || this.user.dossier.mobile && this.user.dossier.birthdate : false;
    },
  },
  methods: {
    ...mapActions({
      userUpdate: 'me/userUpdate',
      fileUpload: 'me/fileUpload',
    }),
    saveStep() {
      this.userUpdate().then(() => {
        this.$store.commit('me/resetUnsaved', 'profile')
      });
    },
  },
  mounted: function () {
    console.log(this.user.id)
  },
  components: {
    profileProfile,
    profileSearching,
    profileAddress,
    profileQualification,
    profileLanguage,
    profileSkills,
    profileUploads,
    profileSettings,
  }
}
</script>
