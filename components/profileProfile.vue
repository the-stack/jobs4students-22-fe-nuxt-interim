<template>
  <v-row>
    <v-col cols="12" md="4">
      <j4s-dropzone v-if="!isCompany" filetype="profilepictures" :fileableid="userData.dossier.id" :immediate="true" :profilepicture="userData.dossier.profilepicture"></j4s-dropzone>
    </v-col>
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="salutation"
                          :items="genders"
                          :item-text="'title_i18n.' + lang"
                          item-value="id"
                          :value-comparator="valueComparator"
          >
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.salutation') }}</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname"
                        dense
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.firstname') }}</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="lastname"
                        dense
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.lastname') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="isCompany && wizard">
        <v-col cols="12" md="12">
          <v-text-field v-model="company"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.company') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="email"
                        dense
                        :error="emailCheck"
                        color="info"
                        @blur="checkEmail(email)"
          >
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.mail') }}</span>
            </template>
          </v-text-field>
          <span v-if="emailCheck">Diese Mail Adresse ist bereits in Verwendung.</span>
        </v-col>
        <v-col cols="12" md="6" v-if="wizard">
          <v-text-field v-model="password"
                        dense
                        type="password"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.password') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="wizard && !isCompany">
        <v-col cols="12" md="6">
          <v-text-field v-model="jobzip"
                        dense
                        type="number"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.jobZip') }}</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="radius"
                        dense
                        type="number"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.radius') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'
import J4sDropzone from "@/components/J4sDropzone";


export default {
  name: 'profileProfile',
  head() {
    return {
      title: 'Profile'
    }
  },
  data() {
    return {
      rules: {
        required: value => !!value || 'Pflichtfeld.',
      },
      emailCheck: false,
    }
  },
  computed: {
    ...mapState({
      genders: state => state.reference.genders,
      lang: state => state.lang,
      userData: state => state.me.userData
    }),
    ...mapFields({
      firstname: 'me.userData.firstname',
      lastname: 'me.userData.lastname',
      company: 'me.userData.company.name',
      email: 'me.userData.email',
      jobzip: 'me.userData.dossier.jobzip',
      radius: 'me.userData.dossier.radius',
      salutation: 'me.userData.gender_id',
      password: 'me.userData.password',
      unsaved: 'me.unsaved.profile',
    }),
    wizard() {
      return this.$route.path === '/signup-company' || this.$route.path === '/signup-student' || this.$route.path === '/signup'
    },
  },
  methods: {
    ...mapActions({
      checkIfEmailExists: 'me/checkIfEmailExists',
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    checkEmail(payload) {
      return this.checkIfEmailExists(payload).then(response => {
        this.emailCheck = response
      })
    },
  },
  watch: {
    firstname() { this.unsaved = true },
    lastname() { this.unsaved = true },
    email() { this.unsaved = true },
    salutation() { this.unsaved = true },
  },
  components: {
    J4sDropzone
  },
  props: [
      'isCompany',
      'location',
  ]
}
</script>
