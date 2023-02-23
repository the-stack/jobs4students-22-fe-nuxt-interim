<template>
  <v-container fluid>
      <v-sheet class="transparent">
        <v-container>
          <v-row class="my-4 my-sm-10 my-md-16" justify="space-between" align="end">
            <v-col cols="12" >
              <v-row v-if="!userid">
                <v-col cols="12">
                  <h2 class="text-h4 text-md-h2 mb-4">Login mit <span class="text--accent">bestehendem</span> Account</h2>
                  <v-card>
                    <login-form></login-form>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="12">
                  <v-card class="mb-1" flat color="transparent">
                    <v-card-title class="px-0 text--accent">Abmelden</v-card-title>
                  </v-card>
                  <v-card>
                    <v-card-text>
                      Du bist aktuell angemeldet. Möchtest Du dich von deinem Account abmelden?
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="auto" class="pa-5">
                          <v-btn block color="primary" class="text--font text-none" @click="logoutDialogOpen">Abmelden</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="!userid" class="mt-12">
            <v-col cols="12" class="mb-5">
              <h2 class="text-h4 text-md-h2 mb-4">Noch <span class="text--accent">keinen</span> Account?</h2>
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <p>Nutze die zahlreichen Vorteile von jobs4students.ch und erstelle einen kostenlosen Account.</p>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">

                      <v-card tile class="fill-height d-flex flex-column">
                        <v-card-title><span class="text-h5"><span class="text--accent">Studenten Account</span> eröffnen</span></v-card-title>
                        <v-card-text class="text--font">Auf der Suche nach einem Ferienjob?</v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-actions class="pa-4">
                          <v-btn
                            tile
                            dark
                            block
                            color="primary" class="font-weight-bold text-none" link to="/students"> Studenten-Account erstellen</v-btn>
                        </v-card-actions>
                      </v-card>

                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card tile class="fill-height d-flex flex-column">
                        <v-card-title><span class="text-h5"><span class="text--accent">Unternehmer Account</span> eröffnen</span></v-card-title>
                        <v-card-text class="text--font">Auf der Suche nach Talenten? </v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-actions class="pa-4">
                          <v-btn
                            tile
                            dark
                            block
                            color="primary" class="font-weight-bold text-none" link to="/companies">Unternehmer-Account erstellen</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-card-text>

              </v-card>
            </v-col>
          </v-row>
          <!--
          <v-row>
            <v-col cols="12" sm="6">
              <v-img cover
                     :src="require('@/assets/img/landing.png')"></v-img>
            </v-col>
          </v-row>
          -->
        </v-container>
      </v-sheet>


    <!-- Logout-Dialog -->
    <v-row justify="center">

      <v-dialog
        v-model="logoutDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Logout
          </v-card-title>

          <v-card-text>
            Möchtest du dich wirklich abmelden?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="secondary"
              text
              @click="logoutDialog = false"
            >
              Nein
            </v-btn>

            <v-btn
              color="error"
              text
              @click="logoutDialogExecute"
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


import {mapActions, mapState} from "vuex";

export default {
  name: 'login',
  head(){
    return {
      title:'Login'
    }
  },
  data() {
    return {
      logoutDialog: false,
      // Validation
      valid: false,
      emailRules: [
        v => !!v || 'E-mail Adresse benötigt',
        v => /.+@.+/.test(v) || 'E-mail muss eine gültige Adresse sein',
      ],
    }
  },
  computed: {
    ...mapState({
      userid: state => state.me.userData.id,
    }),
  },
  methods:{
    ...mapActions({
      logout: 'auth/logout'
    }),
    logoutDialogOpen: function () {
      this.logoutDialog = true
    },
    logoutDialogExecute: function () {
      this.logout();
      this.logoutDialog = false
    },
  }
}
</script>
