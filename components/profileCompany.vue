<template>
  <v-row>
    <v-col cols="12" md="4">
      <j4s-dropzone filetype="companylogos" :immediate="true" :fileableid="userData.company.id" :profilepicture="userData.company.profilepicture"></j4s-dropzone>
    </v-col>
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="name"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.company') }} *</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="email"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('company.email') }} *</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="street1"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.street1') }} *</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="street2"
                        dense
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.street2') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="zip"
                        type="number"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.zip') }} *</span>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="city"
                        dense
                        :rules="[rules.required]"
                        color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.city') }} *</span>
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
  name: 'profileCompany',
  head() {
    return {
      title: 'Profile Company'
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
      genders: state => state.genders,
      lang: state => state.lang,
      userData: state => state.me.userData,
    }),
    ...mapFields({
      name: 'me.userData.company.name',
      email: 'me.userData.company.email',
      street1: 'me.userData.company.street1',
      street2: 'me.userData.company.street2',
      zip: 'me.userData.company.zip',
      city: 'me.userData.company.city',
      country_id: 'me.userData.company.country_id',
      unsaved: 'me.unsaved.profile',
    }),

  },
  methods: {
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
  },
  watch: {
    name() { this.unsaved = true },
    email() { this.unsaved = true },
    street1() { this.unsaved = true },
    street2() { this.unsaved = true },
    zip() { this.unsaved = true },
    city() { this.unsaved = true },
    country_id() { this.unsaved = true },
  },
  components: {
    J4sDropzone
  },
  props: [
    'isCompany'
  ]
}
</script>
