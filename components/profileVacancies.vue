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

    <v-alert
        v-if="userData.company.abo && userData.company.abo.vacancies_active_available>0"
        color="primary"
        class="pa-4"
        type="info"
        dense
        dismissible
    >
      Hinweis: du kannst noch {{userData.company.abo.vacancies_active_available}} Stelle(n) aktivieren.<br>Damit die Stelle öffentlich publiziert wird musst du sie mit einem Klick auf <v-icon>mdi-eye-off</v-icon> aktivieren.
    </v-alert>

    <v-alert
        v-if="!userData.company.abo"
        color="secondary"
        elevation="1"
        class="pa-4"
        type="info"
        dense
        dismissible
    >
      Du hast aktuell noch kein Abo gelöst. Stellen können trotzdem erfasst, aber nicht publiziert werden.
    </v-alert>

    <v-alert
      v-if="userData.company.abo && userData.company.abo.vacancies_active_available<=0"
      color="secondary"
      class="pa-4"
      type="info"
      dense
    >
      Du hast {{userData.company.abo.vacancies_active}} von maximal {{userData.company.abo.vacancies_active_max}} Stellen gleichzeitig veröffentlicht.<br>
      Wenn du mehr als {{userData.company.abo.vacancies_active_max}} Stellen ausschreiben möchtest, so kannst du dein Abo jederzeit hochstufen. Bereits bezahlte Gebühren werden dir angerechnet.
    </v-alert>

    <h3 class="mb-2">Erfasste Stellen deiner Firma:</h3>
    <span v-if="userData.company.users_count>1" class="text-caption">
      (Stellen welche nicht bearbeitbar sind wurden durch andere Mitarbeiter deiner Firma erfasst)
    </span>

    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
    >

      <template slot="item.published" slot-scope="{item}">
        <v-btn
          @click="itemPublish(item)"
          icon
          v-if="userData.company.abo"
          :disabled="item.user_id!=userData.id || (userData.company.abo.vacancies_active_available <= 0 && !item.published)"
        >
          <v-icon v-if="item.published" color="secondary">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>

      </template>
      <template slot="item.action" slot-scope="{item}">
        <v-menu offset-y left
          v-if="item.user_id==userData.id"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list dense width="270" class="py-0">
              <v-list-item @click="previewVacancy(item)">
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-eye</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span class="text--secondary">Vorschau</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="editVacancy(item)">
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span class="text--secondary">Bearbeiten</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="itemPublish(item)" v-if="userData.company.abo && userData.company.abo.vacancies_active_available>0">
                <v-list-item-icon>
                  <v-icon color="secondary" v-if="!item.published">mdi-eye</v-icon>
                  <v-icon color="secondary" v-else>mdi-eye-off</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span class="text--secondary" v-if="!item.published">Aktivieren</span>
                  <span class="text--secondary" v-else>Deaktivieren</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="itemDelete(item)">
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span class="text--secondary">Löschen</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-data-table>

    <v-btn @click="newVacancy()" :disabled="!userData.company.profile_complete">neue Stelle erfassen</v-btn>
    <br><br>
    <profile-vacanciesedit :job2edit="job2edit" v-if="showForm" v-on:close-form="showForm = false"></profile-vacanciesedit>

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
import J4sDropzone from "@/components/J4sDropzone";
import ProfileVacanciesedit from "@/components/ProfileVacanciesedit";

export default {
  name: 'profileVacancies',
  head() {
    return {
      title: 'Stellen'
    }
  },
  components: {
    J4sDatePicker,
    J4sDropzone,
    ProfileVacanciesedit
  },
  data() {
    return {
      job2edit: {},
      dialog: false,
      showForm: false,
      item2delete: null,
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
      headers: [
        {
          text: 'Veröffentlicht',
          value: 'published',
          align: 'start',
          width: '150px'
        },
        {
          text: 'Titel',
          sortable: true,
          value: 'title',
        },
        {
          text: 'Firma',
          sortable: true,
          value: 'company1',
        },
        {
          text: 'Arbeitsort',
          sortable: true,
          value: 'workplace',
          width: '150px'
        },
        {
          text: 'Aktualisierung',
          sortable: true,
          value: 'updated_at',
        },
        {
          text: 'Aktionen',
          sortable: false,
          value: 'action',
          align: 'end'
        },
      ],
    }
  },
  computed: {
    ...mapState({
      items: state => state.me.userData.company.vacancies,
      vacancyBlueprint: state => state.reference.vacancyBlueprint,
      userData: state => state.me.userData,
    }),

    minDate() {
      return new Date(Date.now()).toLocaleDateString('en-CA',
          {month: '2-digit', day: '2-digit', year: 'numeric'});
    },
  },
  methods: {
    ...mapActions({
      vacancyDelete: 'me/vacancyDelete',
      vacancyPublish: 'me/vacancyPublish',
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    ...mapActions({
    }),
    itemDelete(item) {
      this.showForm = false
      this.vacancyDelete(item.id)
    },
    itemPublish(item) {
      this.vacancyPublish({id: item.id, published: !item.published})
    },
    dialogPrepare: function (id) {
      this.item2delete = id
      this.dialog = true
    },
    dialogExecute: function () {
      this.itemDelete(this.item2delete)
      this.dialog = false
    },
    editVacancy: function (item) {
      this.job2edit = _cloneDeep(item)
      this.showForm = true
    },
    newVacancy: function () {
      this.job2edit = _cloneDeep(this.vacancyBlueprint)
      this.showForm = true
    },
    previewVacancy: function (item) {
      this.$router.push({ path: 'job/'+ item.id, query: {preview: true }})
    },

  },
}
</script>
