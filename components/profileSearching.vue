<template>
  <v-container class="ma-0 pa-0">

    <h3 class="mb-2" v-if="availabilities.length > 0">Erfasste Stellenanfragen:</h3>

    <v-card v-for="item in availabilities" :key="item.id" class="mb-4">
      <v-card-text>
        <v-row dense>
          <v-col v-if="isMobile" class="secondary--text">Typ</v-col>
          <v-col v-else class="secondary--text">Nebenjob, Praktikum, ...</v-col>
          <v-col class="secondary--text">von</v-col>
          <v-col class="secondary--text">bis</v-col>
          <v-col v-if="!isMobile" class="secondary--text ">Pensum (min)</v-col>
          <v-col v-if="!isMobile" class="secondary--text">Pensum (max)</v-col>
        </v-row>
        <v-row dense class="align-center">
          <v-col>{{item.vacancytype.title_i18n.de}}</v-col>
          <v-col>{{getDateString(item.date_from)}}</v-col>
          <v-col>{{getDateString(item.date_to)}}</v-col>
          <v-col v-if="!isMobile">{{item.workload_from}}%</v-col>
          <v-col v-if="!isMobile">{{item.workload_to}}%</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogPrepare(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title class="text-h5">Neue Stellenanfrage</v-card-title>
      <v-card-text>

        <v-row>
          <v-col cols="12" sm="4">
            <v-autocomplete v-model="availability.vacancytype_id"
                            :items="vacancytypes"
                            item-text="title_i18n.de"
                            item-value="id"
                            hide-details
                            color="info"
            >
              <template v-slot:label>
                <span class="text--accent">Nebenjob, Praktikum, Ferienjob, Dauerstelle</span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="2">
            <j4s-date-picker v-model="availability.date_from"
                             label="von"
                             locale="de-DE"
                             color="info"
                             :min="minDate"></j4s-date-picker>
          </v-col>
          <v-col cols="12" sm="2">
            <j4s-date-picker v-model="availability.date_to"
                             label="bis"
                             locale="de-DE"
                             color="info"
                             :min="minDate"></j4s-date-picker>
          </v-col>
          <v-col cols="12" sm="2">
            <v-autocomplete v-model="availability.workload_from"
                            :items="percentChoice"
                            item-text="desc"
                            item-value="val"
                            color="info">
              <template v-slot:label>
                <span class="text--accent">Pensum (Min)</span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="2">
            <v-autocomplete v-model="availability.workload_to"
                            :items="percentChoiceReduced"
                            item-text="desc"
                            item-value="val"
                            color="info">
              <template v-slot:label>
                <span class="text--accent">Pensum (Max)</span>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-btn
            :disabled="!availability.vacancytype_id || !availability.date_from || !availability.date_to || !availability.workload_from|| !availability.workload_to"
            block
            depressed
            color="primary"
            class="text--negative"
            @click="availabilityAdd"
        >Jobanfrage hinzufügen</v-btn>
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
  name: 'profileSearching',
  head() {
    return {
      title: 'Ich Suche'
    }
  },
  components: {
    J4sDatePicker
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
      availability: {
        workload_from: null,
        workload_to: null,
        vacancytype_id: null,
        date_from: null,
        date_to: null,
      },
      dialog: false,
      item2delete: null,
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    isMdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    ...mapState({
      lang: state => state.lang,
      availabilities: state => state.me.userData.dossier.availabilities,
      availabilitiesBlueprint: state => state.me.userDataBlueprint.dossier.availabilities,
      vacancytypes: state => state.reference.vacancytypes,
    }),
    ...mapFields({
    }),
    minDate() {
      return new Date(Date.now()).toLocaleDateString('en-CA',
          {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    percentChoiceReduced() {
      return this.percentChoice.filter(obj => {
        return obj.val >= this.availability.workload_from;
      });
    }
  },
  methods: {
    ...mapActions({
      availabilityCreate: 'me/availabilityCreate',
      itemDelete: 'me/availabilityDelete',
    }),
    getDateString: function (date) {
      let newDate = new Date(date);
      return newDate.toLocaleDateString(undefined,
        {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    dialogPrepare: function (id) {
      this.item2delete = id
      this.dialog = true
    },
    dialogExecute: function () {
      this.itemDelete(this.item2delete)
      this.dialog = false
    },
    availabilityAdd: function () {
      this.availabilityCreate(this.availability).then(() => {
        this.availability = _cloneDeep( this.availabilitiesBlueprint )
      })
    }

  }
}
</script>
