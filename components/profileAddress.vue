<template>
  <v-container class="ml-0 pa-0">

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="street1" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.street1') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="street2" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.street2') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="zip" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.zip') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="city" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.city') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="country_id"
                          :items="countries"
                          :item-text="'title_i18n.' + lang"
                          :value-comparator="valueComparator"
                          item-value="id">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.country') }}</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.phone') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="mobile" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.mobile') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="nationality_id"
                          :items="countries"
                          :item-text="'title_i18n.' + lang"
                          :value-comparator="valueComparator"
                          item-value="id">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.nationality') }}</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="permit_id"
                          :items="permits"
                          :item-text="'title_i18n.' + lang"
                          :value-comparator="valueComparator"
                          item-value="id">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.permit') }}</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete v-model="marital_id"
                          :items="maritals"
                          :item-text="'title_i18n.' + lang"
                          :value-comparator="valueComparator"
                          item-value="id">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.marital') }}</span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birthdate"
                  label="Geburtsdatum"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birthdate"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="12" md="6">
          <h2>Mobilität</h2>

          <v-row>
            <v-col cols="4">
              <v-checkbox v-model="bike" dense color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('user.bike') }}</span>
                </template>
              </v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox v-model="car" dense color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('user.car') }}</span>
                </template>
              </v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox v-model="publictransport" dense color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('user.publictransport') }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h2>{{ $tc('user.shift') }}</h2>

          <v-row>
            <v-col cols="12">
              <v-checkbox v-model="shift" dense color="info">
                <template v-slot:label>
                  <span class="text--accent">{{ $tc('user.shift_possible') }}</span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="jobzip" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.jobZip') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="radius" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.radius') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="notes" dense color="info">
            <template v-slot:label>
              <span class="text--accent">{{ $tc('user.notes') }}</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>



  </v-container>
</template>

<script>

import {mapFields} from 'vuex-map-fields'
import {mapState, mapActions} from 'vuex'


export default {
  name: 'profileAddress',
  head() {
    return {
      title: 'Profil Adresse'
    }
  },
  data() {
    return {
      activePicker: null,
      date: null,
      menu: false,
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  computed: {
    ...mapState({
      countries: state => state.reference.countries,
      permits: state => state.reference.permits,
      maritals: state => state.reference.maritals,
      lang: state => state.lang
    }),
    ...mapFields({
      street1: 'me.userData.dossier.street1',
      street2: 'me.userData.dossier.street2',
      zip: 'me.userData.dossier.zip',
      city: 'me.userData.dossier.city',
      country_id: 'me.userData.dossier.country_id',
      phone: 'me.userData.dossier.phone',
      mobile: 'me.userData.dossier.mobile',
      nationality_id: 'me.userData.dossier.nationality_id',
      permit_id: 'me.userData.dossier.permit_id',
      marital_id: 'me.userData.dossier.marital_id',
      birthdate: 'me.userData.dossier.birthdate',
      shift: 'me.userData.dossier.shift',
      car: 'me.userData.dossier.car',
      bike: 'me.userData.dossier.bike',
      publictransport: 'me.userData.dossier.publictransport',
      radius: 'me.userData.dossier.radius',
      jobzip: 'me.userData.dossier.jobzip',
      notes: 'me.userData.dossier.notes',
    })
  },
  methods: {
    ...mapActions({
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    save (date) {
      this.$refs.menu.save(date)
    },
  },
  components:{

  }
}
</script>
