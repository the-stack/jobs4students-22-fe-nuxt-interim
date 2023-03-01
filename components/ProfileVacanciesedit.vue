<template>
  <v-card class="mb-5">

    <v-toolbar
      color="secondary"
      dark
    >

      <v-toolbar-title>
        <span v-if="job2edit===null">Neue Stellenausschreibung erfassen:</span>
        <span v-else>Stellenausschreibung editieren:</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="closeForm()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text class="mt-6">

      <v-row>
        <v-col cols="12" md="4">
          <j4s-dropzone filetype="vacancylogos" :immediate="job2edit.id!==null" :fileableid="job2edit.id" :profilepicture="profilePicture"></j4s-dropzone>
        </v-col>
        <v-col cols="12" md="8">

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="job2edit.title"
                            label="Stellentitel"
                            dense
                            color="secondary">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="job2edit.workplace"
                            label="Arbeitsort"
                            dense
                            color="secondary">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <v-textarea
                  label="Beschreibung"
                  v-model="job2edit.desc"
                  color="secondary"
              ></v-textarea>
            </v-col>

          </v-row>

          <v-row>

            <v-col cols="12" sm="12">
              <v-textarea
                label="Aufgaben"
                v-model="job2edit.tasks"
                color="secondary"
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="12">
              <v-textarea
                  label="Anforderungen"
                  v-model="job2edit.requirements"
                  color="secondary"
              ></v-textarea>
            </v-col>

          </v-row>

          <v-row>

            <v-col cols="12" sm="12">

              <v-autocomplete v-model="job2edit.vacancytype_id"
                              label="Nebenjob, Praktikum, Ferienjob, Dauerstelle"
                              :items="vacancytypes"
                              item-text="title_i18n.de"
                              item-value="id"
                              hide-details
                              color="secondary"
                              :value-comparator="valueComparator"
                              clearable
              >
              </v-autocomplete>


            </v-col>

          </v-row>

          <v-row>

            <v-col cols="12" sm="6">

              <v-autocomplete v-model="job2edit.workload_from"
                              label="Pensum (min)"
                              :items="percentChoice"
                              item-text="desc"
                              item-value="val"
                              clearable
                              color="secondary">
              </v-autocomplete>

            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete v-model="job2edit.workload_to"
                              label="Pensum (max)"
                              :items="percentChoice"
                              item-text="desc"
                              item-value="val"
                              clearable
                              color="secondary">
              </v-autocomplete>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="menu_date_from"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="job2edit.date_from"
                    label="von"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="secondary"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="secondary"
                  v-model="job2edit.date_from"
                  @input="menu_date_from = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6">
              <v-menu
                v-model="menu_date_to"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="job2edit.date_to"
                    label="bis"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="secondary"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="secondary"
                  v-model="job2edit.date_to"
                  @input="menu_date_to = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>

            <v-col cols="12" sm="6">
              <v-autocomplete v-model="job2edit.qualificationtype"
                              label="Bildungsstufe"
                              clearable
                              :items="qualificationtypes"
                              item-text="title_i18n.de"
                              item-value="id"
                              hide-details
                              return-object
                              color="secondary"
                              :value-comparator="valueComparator"
                              @change="resetStudyProfession"
              >
              </v-autocomplete>

            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete v-model="job2edit.study_id"
                              :items="studies"
                              item-text="title_i18n.de"
                              item-value="id"
                              hide-details
                              color="info"
                              v-if="job2edit.qualificationtype && job2edit.qualificationtype.id && job2edit.qualificationtype.is_study"
                              :value-comparator="valueComparator"
              >
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.studies') }}</span>
                </template>
              </v-autocomplete>

              <v-autocomplete v-model="job2edit.profession_id"
                              :items="professions"
                              item-text="title_i18n.de"
                              item-value="id"
                              hide-details
                              color="info"
                              v-if="job2edit.qualificationtype && job2edit.qualificationtype.id && job2edit.qualificationtype.is_profession"
                              :value-comparator="valueComparator"
              >
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.professions') }}</span>
                </template>
              </v-autocomplete>

            </v-col>

          </v-row>


          <v-row class="mt-16">
            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.company1"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.company1') }}</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.company2"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.company2') }}</span>
                </template>
              </v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.street1"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.street1') }}</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.street2"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.street2') }}</span>
                </template>
              </v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.zip"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.zip') }}</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.city"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.city') }}</span>
                </template>
              </v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.contact"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.contact') }}</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="job2edit.email"
                            :rules="[rules.required]"
                            dense
                            color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.email') }}</span>
                </template>
              </v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-checkbox v-model="job2edit.limited" dense color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('vacancy.limited') }}</span>
                </template>
              </v-checkbox>
            </v-col>

            <v-col cols="12" sm="6">

            </v-col>

          </v-row>
        </v-col>
      </v-row>




    </v-card-text>

    <v-card-actions>
      <v-btn
          v-if="!job2edit.id"

          block
          depressed
          color="primary"
          class="negative--text"
          @click="itemAdd"
      >{{ $tc('vacancy.add') }}</v-btn>

      <v-btn
          v-else

          block
          depressed
          color="primary"
          class="negative--text"
          @click="itemUpdate"
      >{{ $tc('vacancy.update') }}</v-btn>


    </v-card-actions>

  </v-card>
</template>
<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'

import _cloneDeep from "lodash/cloneDeep";
import J4sDropzone from "@/components/J4sDropzone";
import ProfileVacanciesedit from "@/components/ProfileVacanciesedit";

export default {
  name: 'profileVacanciesedit',
  head() {
    return {
      title: 'Stelle',
    }
  },
  components: {
    J4sDropzone,
    ProfileVacanciesedit
  },
  data() {
    return {
      percentChoice: [
        { desc: '100%', val: 100 },
        { desc: '90%', val: 90 },
        { desc: '80%', val: 80 },
        { desc: '70%', val: 70 },
        { desc: '60%', val: 60 },
        { desc: '50%', val: 50 },
        { desc: '40%', val: 40 },
        { desc: '30%', val: 30 },
        { desc: '20%', val: 20 },
        { desc: '10%', val: 10 },
      ],
      menu_date_from: false,
      menu_date_to: false,
      rules: {
        required: value => !!value || 'Pflichtfeld.',
      },
    }
  },
  computed: {
    ...mapState({
      vacancytypes: state => state.reference.vacancytypes,
      qualificationtypes: state => state.reference.qualificationtypes,
      studies: state => state.reference.studies,
      professions: state => state.reference.professions,
      file: state => state.me.currentUpload.file,
      userData: state => state.me.userData,
    }),
    ...mapFields({
    }),

    profilePicture() {
      let result = this.userData.vacancies.find(({ id }) => id == this.job2edit.id);
      if (result) {return result.profilepicture}

    },

    minDate() {
      return new Date(Date.now()).toLocaleDateString('en-CA',
          {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    companyCompleted() {
      return this.job2edit.email;
    },
  },
  mounted: function () {
    if (!this.job2edit.id) {
      // prefill company fields
      this.job2edit.email = this.userData.company.email
      this.job2edit.company1 = this.userData.company.name
      this.job2edit.street1 = this.userData.company.street1
      this.job2edit.street2 = this.userData.company.street2
      this.job2edit.zip = this.userData.company.zip
      this.job2edit.city = this.userData.company.city
      this.job2edit.contact = this.userData.firstname + ' ' + this.userData.lastname
    }
  },
  methods: {
    ...mapActions({
      fileUpload: 'me/fileUpload',
      vacancyCreate: 'me/vacancyCreate',
      vacancyUpdate: 'me/vacancyUpdate',
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    ...mapActions({
    }),
    itemAdd() {
      this.vacancyCreate(this.job2edit).then(response => {
        if (this.file) {
          this.fileUpload({ code: 'vacancylogos', desc: '', id: response.id });
        }
        this.$store.commit('setSnackbarMessage', {color: 'secondary', msg: 'Stelle wurde erfolreich erfasst'}, {root: true});
        this.$emit('close-form');
      })
    },
    itemUpdate() {
      this.vacancyUpdate(this.job2edit).then(response => {
        if (this.file) {
          this.fileUpload({ code: 'vacancylogos', desc: '', id: response.id });
        }
        this.$store.commit('setSnackbarMessage', {color: 'secondary', msg: 'Stelle wurde erfolreich aktualisiert'}, {root: true});
        this.$emit('close-form');
      })
    },
    resetStudyProfession: function () {
      this.job2edit.study_id = null
      this.job2edit.study = {}
      this.job2edit.profession_id = null
      this.job2edit.profession = {}
    },
    closeForm() {
      this.$emit('close-form')
    }
  },
  props: {
    job2edit: {
      type: Object
    }
  },
}
</script>
