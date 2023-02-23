<template>
  <v-container class="ma-0 pa-0">

    <v-alert
      v-if="!userData.company.profile_complete"
      close-text="Schliessen"
      color="secondary"
      dark
      dismissible
      type="info"
    >
      Das Firmen-Profil ist noch nicht vollständig ausgefüllt. Bevor ein Abo gelöst werden kann müssen alle Pflichtfelder ausgefüllt sein.
    </v-alert>

    <v-row>

            <!-- aktives Abo -->
      <v-col cols="12" md="12"
        v-if="userData.company.abo_id && userData.company.has_active_abo"
      >
        Du hast aktuell ein <strong>{{userData.company.abo.title_i18n.de}}</strong> welches am {{userData.company.abo_enddate}} abläuft.
        Von den {{userData.company.abo.vacancies_active_max}} maximal verfügbaren Stellenausschreibungen hast du zur Zeit {{userData.company.abo.vacancies_active}} publiziert.
      </v-col>

      <!-- abgelaufenes Abo -->
      <v-col cols="12" md="12"
        v-if="userData.company.abo_id && !userData.company.has_active_abo"
      >
        Dein <strong>{{userData.company.abo.title_i18n.de}}</strong> ist am {{userData.company.abo_enddate}} abgelaufen. Um es zu verlängern kannst du unten ein neues Abo bestellen.
      </v-col>

      <!-- kein Abo -->
      <v-col cols="12" md="12"
        v-if="!userData.company.abo_id && userData.company.profile_complete"
      >
        Du hast aktuell noch kein Abo.
      </v-col>


      <v-col cols="12" md="3" v-for="item in abos" :key="item.id">
        <v-card>
          <v-card-text>
            <strong>{{ item.title_i18n.de }}</strong><br>
            {{ item.vacancies_active_max}} Stellen gleichzeitig
            <p>
              {{item.price_month_chf}} für 30 Tage<br>
              {{item.price_year_chf}} für 1 Jahr<br>

            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
                v-if="userData.company.profile_complete && (!userData.company.abo || !userData.company.has_active_abo || (userData.company.abo && userData.company.abo.id!==item.id))"
                block
                tile
                @click="orderAboDialog(item)"
            >bestellen</v-btn>
            <v-btn
                v-else
                disabled
                block
                tile
                @click="orderAboDialog(item)"
            >aktiv</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>


    </v-row>

    <v-row>
      <v-col>
        Bei einem Upgrade auf ein grösseres Abo bringen wir eine Gutschrift für die vorhandene Restlaufzeit in Abzug.
        <br>
        Die Preise verstehen sich zzgl. MWST
      </v-col>
    </v-row>

    <v-dialog
        v-model="dialog"
        max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          Stellen Abonnement "{{ selectedAbo.title_i18n.de }}" bestellen
        </v-card-title>

        <v-card-text>
          <p>
            Ich möchte für meine Firma ein <span class="font-weight-black">{{ selectedAbo.title_i18n.de }}</span> bestellen.
            Mit diesem Abonnement können <span class="font-weight-black">{{selectedAbo.vacancies_active_max}} Stellen gleichzeitig</span> veröffentlicht werden. Die Bezahlung erfolgt via Rechnung.
          </p>

          <p>Allgemeine Geschäftsbedingungen</p>

          <v-checkbox
              v-model="tc"
              label="Ich akzeptiere die allgemeinen Geschäftsbedingungen."
          ></v-checkbox>



          <v-row class="mt-4">
            <v-col cols="6">
              <v-btn
                  :disabled="!tc"
                  block
                  @click="orderAboProceed({id: selectedAbo.id, duration: 30})"
              >1 Monat für CHF {{selectedAbo.price_month_chf}}</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                  :disabled="!tc"
                  block
                  @click="orderAboProceed({id: selectedAbo.id, duration: 365})"
              >1 Jahr für CHF {{selectedAbo.price_year_chf}}</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col>

            </v-col>
          </v-row>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            Abbrechen
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
  name: 'profileAbo',
  head() {
    return {
      title: 'Abonnement'
    }
  },
  data() {
    return {
      dialog: false,
      selectedAbo: {
        title_i18n: {
          de: ''
        },
        price_month: null,
        price_month_chf: null,
        price_year: null,
        price_year_chf: null
      },
      tc: false,
      rules: {
        required: value => !!value || 'Pflichtfeld.',
      },
      emailCheck: false,
    }
  },
  computed: {
    ...mapState({
      userData: state => state.me.userData,
      abos: state => state.reference.abos,
    }),
    ...mapFields({

    }),

  },
  methods: {
    ...mapActions({
      orderAbo: 'me/orderAbo',
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    orderAboDialog(item) {
      this.selectedAbo = item
      this.dialog = true
    },
    orderAboProceed(payload) {
      this.orderAbo(payload).then(() => {
        this.dialog = false
      })
    }
  },
  watch: {

  },
  components: {

  },
  props: [

  ]
}
</script>
