<template>
  <v-container fluid class="pa-0">
    <v-form v-model="valid">
      <v-card flat color="negative">
        <v-card-text>
          <v-row class="pt-5">
            <v-col cols="12">
              <v-text-field v-model="login.mail"
                            :rules="emailRules"
                            required
                            dense
                            color="accent">
                <template v-slot:label>
                  <span class="text--accent">E-Mail-Adresse</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="login.password"
                            type="password"
                            dense
                            color="accent">
                <template v-slot:label>
                  <span class="text--accent">Passwort</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p class="text--font">
                Passwort vergessen?<br>
                <nuxt-link
                  to="/password-forgot"
                  class="text--font"
                  >Klicke hier um dein <span class="text--accent">Passwort zurückzusetzen</span></nuxt-link>
                </p>

                <v-sheet color="secondary" class="pa-4" v-if="tempPassswordChangeMessage">
                  Hinweis: aufgrund einer Systemumstellung mussten wir alle Passwörter zurücksetzen. Du kannst dir mit dem "Passwort vergessen" Link ein neues Passwort generieren.
                </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="auto" class="pa-5">
              <v-btn dark block color="primary" class="text-none font-weight-bold" @click="loginUser">Anmelden</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>

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
      login:{
        mail:"",
        password:""
      },
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
      tempPassswordChangeMessage: state => state.auth.tempPassswordChangeMessage,
    }),
  },
  methods:{
    ...mapActions({
      loginUserAction: 'auth/login',
      logout: 'auth/logout'
    }),
    loginUser() {
      let payload = {username: this.login.mail, password: this.login.password}
      this.loginUserAction(payload)
    },
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
