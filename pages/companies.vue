<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container class="bg page-companies" fluid>
        <v-row dense class="my-0 my-md-16 mx-0 mx-md-4">
          <v-col cols="12" sm="5">
            <v-card dark class="pa-5 mt-0 mt-md-16" color="primary">
              <h1 class="text-h2 text-md-h2 text--accent">
                Wir vermitteln flexible und motivierte junge Talente
              </h1>
              <p>Wir finden für Sie die passenden Talente zur Besetzung einer Praktikumsstelle, bei kurzfristigem
                Personalbedarf oder zur Rekrutierung Ihrer Fach- und Führungskräfte der Zukunft</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="negative">
      <v-container>
        <v-row dense class="my-10" justify="space-between">
          <v-col cols="12" md="6" class="mt-10 mt-md-0" order="2" order-md="1">
            <h2 class="text-h3 text-md-h2">Unser <span class="text--fontPrimary">Service</span></h2>
            <v-list two-line dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Wir finden dank grossem Bewerberpool schnell die <br> passenden Studenten für Ihre Projekte
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Personalvermittlung oder Personalverleih : Sie entscheiden
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Personalvermittlung: Sie stellen die Studentin oder den Studenten befristet oder dauerhaft in Ihrem
                  Unternehmen ein, wir stellen ein pauschales Vermittlungshonorar in Rechnung
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Personalverleih: wir stellen die Studentin oder den Studenten zu einem transparanten, dem GAV
                  entsprechenden Lohn ein, Sie erhalten von uns eine Monatsfaktura über die geleisteten Einsatzstunden
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Gewinnen Sie mit uns Ihre Fachkräfte von morgen
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Melden Sie uns unverbindlich Ihre zu besetzende Stelle - Sie hören umgehend von uns
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon large color="secondary">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  Unser Bewerberpool umfasst über 2500 registrierte StudentInnen. Inserieren Sie ihre Stelle zu günstigen Konditionen.
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="5" class="mt-n16" order="1" order-md="2">

            <signup-form role="2"></signup-form>

          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import {mapFields} from 'vuex-map-fields'
import {mapActions, mapState} from 'vuex'
import signupForm from "@/components/signupForm"

export default {
  name: 'companies',
  head() {
    return {
      title: "Für Unternehmen"
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({

    }),
    ...mapFields({

    }),

  },
  methods: {
  },
  components: {
    signupForm
  }
}
</script>
