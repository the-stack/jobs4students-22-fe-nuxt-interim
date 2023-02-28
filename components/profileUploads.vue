<template>
  <v-container class="ma-0 pa-0">

    <h3 class="mb-2" v-if="items.length > 0">Erfasste Uploads:</h3>

    <v-card v-for="item in items" :key="item.id" class="mb-5">
      <v-card-text>
        <v-row dense>
          <v-col class="secondary--text">Datei</v-col>
          <v-col class="secondary--text" v-if="isMobile">Bezeichnung</v-col>
          <v-col class="secondary--text">Datum</v-col>

        </v-row>
        <v-row dense class="align-center">
          <v-col><a
              :href=item.publicurl
              target="_blank"
              class="secondary--text"
          >{{item.filetype.title_i18n.de}}</a></v-col>
          <v-col v-if="isMobile">{{item.desc}}</v-col>
          <v-col>{{getDateString(item.created_at)}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogPrepare(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-5">
      <v-card-title class="text-h5">Neues Dokument</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-file-input
                chips
                small-chips
                truncate-length="15"
                v-model="currentUploadFile"
                accept="image/*, .pdf, .doc"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="filetype_code"
                            :items="filetypes"
                            item-text="title_i18n.de"
                            item-value="code"
                            hide-details
                            color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.upload.filetype') }}</span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filedesc"
                          dense
                          class="pt-4"
                          color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.upload.desc') }}</span>
              </template>
            </v-text-field>
          </v-col>

        </v-row>


      </v-card-text>
      <v-card-actions>
        <v-btn
            :disabled="!currentUploadFile || !filetype_code"
            block
            depressed
            color="primary"
            class="text--negative"
            @click="uploadFile"
        >Datei hinzufügen</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Lösch-Dialog -->
    <v-row justify="center">

      <v-dialog
          v-model="dialog"
          max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Löschen?
          </v-card-title>

          <v-card-text>
            Willst du den Eintrag wirklich löschen?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="secondary"
                text
                @click="dialog = false"
            >
              Nein
            </v-btn>

            <v-btn
                color="error"
                text
                @click="dialogExecute()"
            >
              Ja
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </v-container>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'


export default {
  name: 'profileDocuments',
  head() {
    return {
      title: 'Unterlagen'
    }
  },
  components: {

  },
  data() {
    return {
      filetype_code: '',
      filedesc: '',
      dialog: false,
      item2delete: null,
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,
      items: state => state.me.userData.dossier.files,
      filetypes: state => state.reference.filetypes,
      userData: state => state.me.userData,

    }),
    ...mapFields({
      currentUpload: 'me.currentUpload',
      currentUploadFile: 'me.currentUpload.file',
    }),
    minDate() {
      return new Date(Date.now()).toLocaleDateString('en-CA',
          {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
  },
  methods: {
    ...mapActions({
      fileUpload: 'me/fileUpload',
      fileDelete: 'me/fileDelete',
    }),
    uploadFile() {
      if (this.currentUploadFile) {
        this.fileUpload({code: this.filetype_code, desc: this.filedesc, id: this.userData.dossier.id});
      }
    },
    dialogPrepare: function (id) {
      this.item2delete = id
      this.dialog = true
    },
    dialogExecute: function () {
      this.fileDelete(this.item2delete)
      this.dialog = false
    },
    getDateString: function (date) {
      let newDate = new Date(date);
      return newDate.toLocaleDateString(undefined,
        {month: '2-digit', day: '2-digit', year: 'numeric'});
    },

  }
}
</script>
