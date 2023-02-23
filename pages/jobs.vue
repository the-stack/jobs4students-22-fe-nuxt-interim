<template>
  <v-container>
    <v-sheet class="transparent">
      <v-container>

        <v-row dense class="mt-4 mt-sm-10 mt-md-16" justify="space-between">
          <v-col cols="12" sm="12" md="12">
            <h2 class="text-h4 text-md-h2 mb-4">Aktuelle <span class="text--accent">Stellen</span></h2>
            <h3 class="text-h5">Hier findest du alle offenen Jobs. Feststelle, Praktikum, Nebenjob oder Kurzeinsatz – wir sind stets auf der Suche nach motivierten Studierenden.</h3>
          </v-col>
        </v-row>

        <!-- Filter -->
        <v-row>
          <v-col cols="6">
            <v-select
              label="Alle Stellen"
              :items="vacancytypes"
              item-text="title_i18n.de"
              item-value="id"
              multiple
              hide-details
              solo
              v-model="vacancyFilterVacancytypes"
              @change="getVacancies"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              label="Alle Qualifikationen"
              :items="qualificationtypes"
              item-text="title_i18n.de"
              item-value="id"
              multiple
              hide-details
              solo
              v-model="vacancyFilterQualificationtypes"
              @change="getVacancies"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">

            <v-card>
              <v-card-text>
                <v-card
                  flat
                  link
                  :to="'/job/' + vacancy.id"
                  v-for="vacancy in vacancies" :key="vacancy.id">
                  <v-card-text>
                    <span class="vacancy--title" v-html="vacancy.title"></span>
                    <p v-html="vacancy.overview"></p>
                    <v-card-actions class="pa-0">
                      <svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                           viewBox="0 0 41.5 18.5" style="max-width: 50px; enable-background:new 0 0 41.5 18.5;" xml:space="preserve">
                            <style type="text/css">.st0{fill:#706F6F;}</style>
                        <g id="arrowright">
                              <polygon class="st0" points="30.4,0 29.4,1.3 37.9,7.9 0,7.9 0,9.5 38.1,9.5 29.3,17.3 30.4,18.5 41.5,8.7 	"/>
                            </g>
                      </svg>
                    </v-card-actions>
                    <v-divider class="mt-5 vacancy--line"></v-divider>
                  </v-card-text>
                </v-card>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!--
        <v-row>
          <v-col cols="12">
            <v-card
              v-if="!isMobile">
              <v-card-text>

                <v-data-table
                  :headers="headers"
                  :items="vacancies"
                  class="row-pointer"
                  :items-per-page="10"
                  @click:row="selectVacancy"
                >
                </v-data-table>

              </v-card-text>
            </v-card>
            <v-card v-if="isMobile">
              <v-list dense>
                <v-list-item
                  v-for="item in vacancies" :key="item.id"
                  @click="selectVacancy(item)"
                >
                  {{ item.title }} <span v-if="item.workplace">, {{ item.workplace }}</span>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
        -->
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {mapFields} from "vuex-map-fields";

export default {
  name: 'vacancies',
  head() {
    return {
      title: "Stellen"
    }
  },
  data() {
    return {
      currentItem: {},
      headers: [
        {
          text: 'Titel',
          align: 'start',
          sortable: true,
          value: 'title',
        },
        {
          text: 'Arbeitsort',
          sortable: true,
          value: 'workplace',
        },
        {
          text: 'Stellentyp',
          sortable: true,
          value: 'vacancytype.title_i18n.de',
        },
        {
          text: 'Veröffentlicht am',
          sortable: true,
          value: 'created_at',
        }
      ],
    }
  },
  computed: {
    ...mapState({
      vacancies: state => state.reference.vacancies,
      vacancytypes: state => state.reference.vacancytypes,
      qualificationtypes: state => state.reference.qualificationtypes,
    }),
    ...mapFields({
      vacancyFilterVacancytypes: 'me.vacancyFilter.vacancytypes',
      vacancyFilterQualificationtypes: 'me.vacancyFilter.qualificationtypes',
    }),
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    isMdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  },
  methods: {
    selectVacancy: function (item) {
      this.$router.push({path: '/job/' + item.id})
    },
    getDateString: function (date) {
      let newDate = new Date(date);
      return newDate.toLocaleDateString(undefined,
        {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
    getVacancies: function () {
      this.$store.dispatch('reference/readVacancyDatas');
    }
  },
  components: {}
}
</script>
<style lang="scss">
span.vacancy--title {
  display: inline-block;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 7px 0;
  @media (max-width: 992px) {
    font-size: 22px;
    line-height: 28px;
  }
}
.vacancy--line {
  border-color: rgba(0,0,0,0.3) !important;
}

.v-card__text {
  @media (max-width: 992px) {
    font-size: 16px;
  }
}

</style>
