<template>
  <v-container>

    <h2 class="text-h4 text-md-h2 mb-4">{{vacancy.title}}</h2>

    <div v-if="vacancy.published || (vacancy.company_id == userData.company_id)">

      <!-- Preview Modus -->
      <v-card v-if="this.$route.query && this.$route.query.hasOwnProperty('preview')" class="mb-6">
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn
                class="text-none font-weight-bold"
                color="secondary"
                x-large
                block
                nuxt link to="/profile-company?tab=vacancies">zurück zum Profil</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <!-- Unternehmer Account -->
      <v-alert
        v-if="userData.id && userData.role_id > 1 && (this.$route.query && !this.$route.query.hasOwnProperty('preview'))"
        type="info"
        close-text="Schliessen"
        color="secondary"
        dark
        dismissible
      >
        Hinweis: du bist mit einem Unternehmer-Konto eingeloggt und kannst dich somit nicht auf diese Stelle bewerben.
      </v-alert>

      <!-- nicht eingeloggt -->
      <v-card v-if="!userData.id" class="mb-6">
        <v-card-text>
          Um sich auf diese Stelle bewerben zu können ist ein ausgefülltes Dossier notwendig.
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn
                class="text-none font-weight-bold"
                color="secondary"
                x-large
                block
                @click="storeJobAndCreateAccount(vacancy.id)"
              >Account erstellen</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                class="text-none font-weight-bold"
                color="secondary"
                x-large
                block
                @click="storeJobAndLogin(vacancy.id)"
              >Login</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <!-- eingeloggt -->
      <v-card v-if="userData.id && userData.role_id === 1 && !checkApplications" class="mb-6">
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn
                class="text-none font-weight-bold"
                color="secondary"
                x-large
                block
                @click="applyDialog = true">Für diese Stelle bewerben</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>

      <!-- Stelle nicht veröffentlicht, aber User gehört zu dieser Firma -->
      <v-alert
        v-if="!vacancy.published && vacancy.company_id == userData.company_id"
        type="info"
        close-text="Schliessen"
        color="secondary"
        dark
        dismissible
      >
        Hinweis: diese Stelle ist noch nicht veröffentlich. Nur du kannst sie sehen.
      </v-alert>

      <!-- Student hat sich bereits beworben -->
      <v-alert
        v-if="checkApplications"
        type="info"
        close-text="Schliessen"
        color="secondary"
        dark
        dismissible
      >
        Hinweis: du hast dich bereits auf diese Stelle beworben
      </v-alert>

      <v-card>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="6">
              <p v-if="vacancy.desc" v-html="vacancy.desc" class="multiline j4s-paragraph"></p>

              <strong v-if="vacancy.tasks">Aufgaben:</strong>
              <p v-if="vacancy.tasks" v-html="vacancy.tasks" class="multiline"></p>

              <strong v-if="vacancy.requirements">Anforderungen:</strong>
              <p v-if="vacancy.requirements" v-html="vacancy.requirements" class="multiline"></p>

              <p class="j4s-paragraph">
                <strong v-if="vacancy.vacancytype_id">Stellentyp: </strong>
                <span v-if="vacancy.vacancytype_id" v-html="vacancy.vacancytype.title_i18n.de" class="multiline"></span>
              </p>

              <strong v-if="vacancy.workload_from || vacancy.workload_to">Stellenprozent:</strong>
              <p class="j4s-paragraph">
                <span v-if="vacancy.workload_from">{{vacancy.workload_from}}%</span>
                <span v-if="vacancy.workload_from && vacancy.workload_to"> - </span>
                <span v-if="vacancy.workload_to">{{vacancy.workload_to}}%</span>
              </p>

              <strong v-if="vacancy.date_from || vacancy.date_to">Von / bis:</strong>
              <p class="j4s-paragraph">
                <span v-if="vacancy.date_from">{{getDateString(vacancy.date_from)}}</span>
                <span v-if="vacancy.date_from && vacancy.date_to"> bis </span>
                <span v-if="vacancy.date_to">{{getDateString(vacancy.date_to)}}</span>
              </p>

              <p v-if="vacancy.limited" class="j4s-paragraph">
                <strong>Befristet:</strong>
                <span v-if="vacancy.limited === true"> ja</span>
                <span v-else> nein<br></span>
              </p>

              <p class="j4s-paragraph">
                <strong v-if="vacancy.qualificationtype_id">Qualifikation: </strong>
                <span v-if="vacancy.qualificationtype_id" v-html="vacancy.qualificationtype.title_i18n.de" class="multiline"></span>
              </p>

              <p class="j4s-paragraph">
                <strong v-if="vacancy.profession_id">Berufsfeld:</strong>
                <span v-if="vacancy.profession_id" v-html="vacancy.profession.title_i18n.de" class="multiline"></span>
              </p>

              <p class="j4s-paragraph">
                <strong v-if="vacancy.study_id">Studiengebiet:</strong>
                <span v-if="vacancy.study_id" v-html="vacancy.study.title_i18n.de" class="multiline"></span>
              </p>



            </v-col>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="5">

              <v-img
                class="j4s-profilepicture mb-5"
                lazy-src="https://picsum.photos/id/11/10/6"
                v-if="vacancy.profilepicture && vacancy.profilepicture.publicurl"
                :src="vacancy.profilepicture.publicurl"
              ></v-img>

              <p v-if="vacancy.workplace" class="j4s-paragraph">
                <span class="font-weight-black" >Arbeitsort:</span> {{vacancy.workplace}}
              </p>

              <p v-if="vacancy.company1" class="j4s-paragraph">
                <span class="font-weight-black" >Arbeitgeber:</span><br>
                <span v-if="vacancy.company1">{{vacancy.company1}}<br></span>
                <span v-if="vacancy.company2">{{vacancy.company2}}<br></span>
                <span v-if="vacancy.street1">{{vacancy.street1}}<br></span>
                <span v-if="vacancy.street2">{{vacancy.street2}}<br></span>
                <span v-if="vacancy.zip">{{vacancy.zip}} </span>
                <span v-if="vacancy.city">{{vacancy.city}}<br></span>
                <span v-if="vacancy.country">{{vacancy.country}}<br></span>
              </p>

              <p v-if="vacancy.email" class="j4s-paragraph">
                <span class="font-weight-black" >Kontakt:</span> {{vacancy.email}}
              </p>

              <p class="j4s-paragraph">
                <span class="font-weight-black" >erstellt am:</span> {{getDateString(vacancy.created_at)}}<br>
                <span class="font-weight-black" >aktualisiert am:</span> {{getDateString(vacancy.updated_at)}}
              </p>

            </v-col>
          </v-row>

        </v-card-text>




      </v-card>


      <!-- Bewerben-Dialog -->
      <v-row justify="center">

        <v-dialog
          v-model="applyDialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="text-h5">
              Bewerbung einreichen?
            </v-card-title>

            <v-card-text>
              <p>Möchtest Du dich auf diese Stelle bewerben?</p>
              <p>Wenn du auf "Ja" klickst stimmst du zu, dass dein Dossier an die Firma weitergereicht werden darf.</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="secondary"
                text
                @click="applyDialog = false"
              >
                Nein
              </v-btn>

              <v-btn
                color="error"
                text
                @click="applicationAdd()"
              >
                Ja
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>
<script>

import {mapActions, mapState} from "vuex";
import _cloneDeep from "lodash/cloneDeep";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'vacancyDetail',
  head() {
    return {
      title: 'Stelle',
    }
  },
  data() {
    return {
      applyDialog: false
    }
  },
  async asyncData({$axios, params}) {
    let query = `{
                    vacancy(id:${params.id}) {
                      id
                      user_id
                      company_id
                      title
                      desc
                      workplace
                      tasks
                      requirements
                      company1
                      company2
                      contact
                      street1
                      street2
                      zip
                      city
                      email
                      workload_from
                      workload_to
                      date_from
                      date_to
                      limited
                      published
                      vacancytype_id
                      vacancytype {
                        id
                        title_i18n {
                          de
                        }
                      }
                      profilepicture {
                        id
                        filetype_id
                        publicurl
                        storageurl
                        created_at
                        updated_at
                      }
                      qualificationtype_id
                      qualificationtype {
                        id
                        title_i18n {
                          de
                        }
                        is_study
                        is_profession
                      }
                      profession_id
                      profession {
                        id
                        title_i18n {
                          de
                        }
                      }
                      study_id
                      study {
                        id
                        title_i18n {
                          de
                        }
                      }
                      date_from
                      date_to
                      created_at
                      updated_at
                    }
              }`;
    const vacancy = await $axios.$post(process.env.NUXT_ENV_LARAVEL_GRAPHQL, {query: query}).then(res => res.data.vacancy)
    return {vacancy}
  },
  computed: {
    ...mapState({
      userData: state => state.me.userData,
      vacancyStorage: state => state.me.vacancyStorage,
    }),
    ...mapFields({
      vacancyStorage: 'me.vacancyStorage',
    }),
    checkApplications() {
      return this.userData.applications.find((application) => application.vacancy_id==this.$route.params.id);
    },
  },
  methods: {
    ...mapActions({
      applicationCreate: 'me/applicationCreate',
    }),
    applicationAdd: function () {
      this.applicationCreate({vacancy_id: this.vacancy.id, comment: ''}).then(() => {
        this.applyDialog = false
        this.$store.commit('setSnackbarMessage', {color: 'secondary', msg: 'Deine Bewerbung für diese Stelle wurde eingereicht'}, {root: true});
      }).catch(err => {
        this.applyDialog = false
        this.$store.commit('setSnackbarMessage', {color: 'error', msg: 'Bei der Einreichung deiner Bewerbung ist etwas schief gelaufen.'}, {root: true});
      });
    },
    getDateString: function (date) {
      let newDate = new Date(date);
      return newDate.toLocaleDateString(undefined,
        {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    storeJobAndLogin(id) {
      this.vacancyStorage = id
      this.$router.push({path:'/login'});
    },
    storeJobAndCreateAccount(id) {
      this.vacancyStorage = id
      this.$router.push({path:'/students'});
    }
  }
}
</script>
<style scoped>
  .multiline {
    white-space: pre-wrap;
  }
</style>
