<template>
  <v-container class="ma-0 pa-0">
    <v-row>
      <v-col cols="12" md="4">

      </v-col>
      <v-col cols="12" md="8">

        <v-card flat v-if="userData.role_id===1">
          <v-card-title class="text-h4 text-md-h2">
            Mail-Einstellungen
          </v-card-title>
          <v-card-text>
            <v-checkbox
                v-model="settings_no_vacancymails"
                label="Ich möchte keine Stellen Mails erhalten"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   large
                   class="text--font text-none font-weight-black"
                   @click="userUpdate">
              Mail-Einstellungen Speichern
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card flat>
          <v-card-title class="text-h4 text-md-h2">
            Account
          </v-card-title>
          <v-card-text>
            <p>Du möchtest dein Konto vollständig löschen? Klicke auf den Button "Profil löschen" - aber bitte
              denk daran, dass dein Profil nachher vollständig gelöscht ist und nicht mehr wiederhergestellt werden kann.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error"
                   large

                   @click="dialogDelete = true">
              Profil Löschen
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>

    <!-- Logout-Dialog -->
    <v-dialog
        v-model="dialogDelete"
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Profil endgültig löschen
        </v-card-title>

        <v-card-text>
          Möchtest du dein Profil wirklich endgültig löschen? Bitte denke daran, dass es nachträglich nicht mehr
          wiederhergestellt werden kann.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="secondary"
              text
              @click="dialogDelete = false"
          >
            Nein
          </v-btn>

          <v-btn
              color="error"
              text
              @click="meDelete"
          >
            Ja
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'
import J4sDropzone from "@/components/J4sDropzone";


export default {
  name: 'profileSettings',
  head() {
    return {
      title: 'ProfileSettings'
    }
  },
  data() {
    return {
      dialogDelete: false
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,
      userData: state => state.me.userData
    }),
    ...mapFields({
      settings_no_vacancymails: 'me.userData.settings_no_vacancymails',
    }),

  },
  methods: {
    ...mapActions({
      userUpdate: 'me/userUpdate',
      meDelete: 'me/meDelete',
    }),
  },
  watch: {

  },
  components: {
    J4sDropzone
  },
}
</script>
