<template>
  <v-container class="ma-0 pa-0">
    <v-card class="mb-6">
      <v-card-text>
        <v-col cols="12" md="6">
          <p>
            Beschreibe deine besonderen Skills wie z.B. Umgang mit spezifischer Software
            oder andere spezifische Fähigkeiten / Kenntnisse.
          </p>
          <v-textarea
              label="Meine Skills..."
              v-model="skills"
          ></v-textarea>

        </v-col>
      </v-card-text>
    </v-card>


  </v-container>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'


export default {
  name: 'profileSkills',
  head() {
    return {
      title: 'Skills'
    }
  },
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,

    }),
    ...mapFields({
      skills: 'me.userData.dossier.skills',
    }),

  },
  methods: {
    ...mapActions({


    }),


  }
}
</script>
