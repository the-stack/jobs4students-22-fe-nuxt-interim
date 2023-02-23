<template>
  <v-container class="ma-0 pa-0">

    <h3 class="mb-2" v-if="items.length > 0">Erfasste Sprachen:</h3>

    <v-card v-for="item in items" :key="item.id" class="mb-5">
      <v-card-text>
        <v-row dense>
          <v-col class="secondary--text">Sprache</v-col>
          <v-col class="secondary--text">mündlich</v-col>
          <v-col class="secondary--text">schriftlich</v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col>{{item.title_i18n.de}}</v-col>
          <v-col>{{item.pivot.oral_languagelevel.title_i18n.de}}</v-col>
          <v-col>{{item.pivot.written_languagelevel.title_i18n.de}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogPrepare(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-5">
      <v-card-title class="text-h5">Neue Sprache</v-card-title>
      <v-card-text>

        <v-row>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="newLanguage"
                            return-object
                            :items="refLanguages"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.language.language') }}</span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="newLanguage_oral"
                            return-object
                            :items="refLanguagelevels"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.language.languagelevel_oral') }}</span>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" sm="4">
            <v-autocomplete v-model="newLanguage_written"
                            return-object
                            :items="refLanguagelevels"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.language.languagelevel_written') }}</span>
              </template>
            </v-autocomplete>
          </v-col>

        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
            :disabled="!(newLanguage.id && newLanguage_oral.id && newLanguage_written.id)"
            block
            depressed
            color="primary"
            class="black--text"
            @click="languageAdd"
        >{{ $tc('user.language.add') }}</v-btn>
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
import J4sDatePicker from "@/components/J4sDatePicker"

export default {
  name: 'profileLanguages',
  head() {
    return {
      title: 'Sprachen'
    }
  },
  components: {
    J4sDatePicker
  },
  data() {
    return {
      newLanguage: {
        id: null,
        title_i18n: {
          de: null,
        }
      },
      newLanguage_oral: {
        id: null,
        title_i18n: {
          de: null,
        }
      },
      newLanguage_written: {
        id: null,
        title_i18n: {
          de: null,
        }
      },
      dialog: false,
      item2delete: null,
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,
      items: state => state.me.userData.dossier.languages,
      refLanguages: state => state.reference.languages,
      refLanguagelevels: state => state.reference.languageLevels,
    }),
    ...mapFields({
    }),
    language2add() {
      return {
        id: this.newLanguage.id,
        title_i18n: {
          de: this.newLanguage.title_i18n.de,
        },
        pivot: {
          oral_languagelevel_id: this.newLanguage_oral.id,
          oral_languagelevel: {
            id: this.newLanguage_oral.id,
            title_i18n: {
              de: this.newLanguage_oral.title_i18n.de
            }
          },
          written_languagelevel_id: this.newLanguage_written.id,
          written_languagelevel: {
            id: this.newLanguage_written.id,
            title_i18n: {
              de: this.newLanguage_written.title_i18n.de
            }
          },
        }
      };
    },
  },
  methods: {
    ...mapActions({
    }),
    // special handling because it's a sync
    // not the same like qualifications etc
    languageRemove(id) {
      this.$store.commit('me/removeLanguage', id)
      this.$store.dispatch('me/languageUpdate')
    },
    languageAdd() {
      // check if this language is already used
      let result = this.items.find(obj => {
        return obj.id === this.language2add.id
      })

      if (!result) {
        this.$store.commit('me/addLanguage', this.language2add)
        this.$store.dispatch('me/languageUpdate').then(() => {
          this.newLanguage = {
            id: null,
            title_i18n: {
              de: null,
            }
          }
          this.newLanguage_oral = {
            id: null,
            title_i18n: {
              de: null,
            }
          }
          this.newLanguage_written = {
            id: null,
            title_i18n: {
              de: null,
            }
          }
        })
      } else {
        this.$store.commit('setSnackbarMessage', {color: 'error', msg: 'Diese Sprache hast Du bereits erfasst.'}, {root: true});
      }


    },
    dialogPrepare: function (id) {
      this.item2delete = id
      this.dialog = true
    },
    dialogExecute: function () {
      this.languageRemove(this.item2delete)
      this.dialog = false
    }

  }
}
</script>
