<template>
  <v-container class="ma-0 pa-0">

    <h3 class="mb-2" v-if="items.length > 0">Erfasste Ausbildungen:</h3>

    <v-card v-for="item in items" :key="item.id" class="mb-5">
      <v-card-text>
        <v-row dense>
          <v-col class="secondary--text">Ausbildung</v-col>
          <v-col class="secondary--text">Vertiefung</v-col>
          <v-col class="secondary--text">Beschreibung</v-col>
          <v-col class="secondary--text">Abschlussjahr</v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col><span v-if="item.qualificationtype && item.qualificationtype.title_i18n && item.qualificationtype.title_i18n.de">{{item.qualificationtype.title_i18n.de}}</span></v-col>
          <v-col>
            <span v-if="item.qualificationtype.is_study && item.study">{{item.study.title_i18n.de}}</span>
            <span v-if="item.qualificationtype.is_profession && item.profession">{{item.profession.title_i18n.de}}</span>
          </v-col>
          <v-col>{{item.desc}}</v-col>
          <v-col>{{item.year}}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogPrepare(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-5">
      <v-card-title class="text-h5">Neue Ausbildung</v-card-title>
      <v-card-text>

        <v-row>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="newItem.qualificationtype"
                            :items="qualificationtypes"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info"
                            return-object
            >
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.qualification.qualificationtype') }}</span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="newItem.study_id"
                            :items="studies"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info"
                            v-if="newItem.qualificationtype.id && newItem.qualificationtype.is_study"
            >
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.qualification.study') }}</span>
              </template>
            </v-autocomplete>

            <v-autocomplete v-model="newItem.profession_id"
                            :items="professions"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info"
                            v-if="newItem.qualificationtype.id && newItem.qualificationtype.is_profession"
            >
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.qualification.profession') }}</span>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" sm="2">
            <v-text-field v-model="newItem.year"
                          dense
                          class="pt-sm-4 pt-0"
                          hide-details
                          type="number"
                          color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.qualification.year') }}</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="newItem.desc"
                          dense
                          class="pt-sm-4 pt-0"
                          hide-details
                          color="info">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.qualification.desc') }}</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
            :disabled="!newItem.qualificationtype || !newItem.year"
            block
            depressed
            color="primary"
            class="black--text"
            @click="itemAdd"
        >{{ $tc('user.qualification.add') }}</v-btn>
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
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: 'profileQualification',
  head() {
    return {
      title: 'Ausbildung'
    }
  },
  components: {
    J4sDatePicker
  },
  data() {
    return {
      newItem: {
        id: null,
        qualificationtype: {
          id: null,
          title_i18n: {
            de: '',
          },
          is_study: null,
          is_profession: null,
        },
        qualificationtype_id: null,
        study_id: null,
        profession_id: null,
      },
      dialog: false,
      item2delete: null,
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang,
      items: state => state.me.userData.dossier.qualifications,
      qualificationtypes: state => state.reference.qualificationtypes,
      studies: state => state.reference.studies,
      professions: state => state.reference.professions,
    }),
    ...mapFields({
    }),
    newItemToWatch: function () {
      return this.newItem.qualificationtype.id
    }
  },
  watch: {
    newItemToWatch: function () {
      this.newItem.study_id = null,
      this.newItem.profession_id = null
    },
  },
  methods: {
    ...mapActions({
      itemDelete: 'me/qualificationDelete',
    }),
    itemAdd() {
      //this.$store.commit('me/addQualification', this.newItem)
      this.$store.dispatch('me/qualificationCreate', this.newItem).then(() => {
        this.newItem = {
          id: null,
              qualificationtype: {
            id: null,
                title_i18n: {
              de: '',
            },
            is_study: null,
                is_profession: null,
          },
          qualificationtype_id: null,
              study_id: null,
              profession_id: null,
        }
      })
    },
    dialogPrepare: function (id) {
      this.item2delete = id
      this.dialog = true
    },
    dialogExecute: function () {
      this.itemDelete(this.item2delete)
      this.dialog = false
    }

  }
}
</script>
