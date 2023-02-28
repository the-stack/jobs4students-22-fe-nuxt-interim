<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container>
        <v-row dense class="my-4 my-sm-10 my-md-16" justify="space-between">
          <v-col cols="12" sm="10">
            <v-row>
              <v-col cols="12">
                <v-card class="mb-1" flat color="transparent">
                  <v-card-title class="px-0 text--negative">Passwort zurücksetzen</v-card-title>
                </v-card>
                <v-card>
                  <v-card-text>
                    <v-row class="pt-5">
                      <v-col cols="12">
                        <v-text-field v-model="login.mail"
                                      dense
                                      :error-messages="!login.mail?'(Pflichtfeld)':''"
                                      color="info">
                          <template v-slot:label>
                            <span class="text--accent">E-Mail-Adresse</span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="login.password"
                                      type="password"
                                      dense
                                      :error-messages="!login.password?'(Pflichtfeld)':''"
                                      color="info">
                          <template v-slot:label>
                            <span class="text--accent">Neues Passwort</span>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="login.passwordconfirmation"
                                      type="password"
                                      dense
                                      :error-messages="!login.passwordconfirmation?'(Pflichtfeld)':''"
                                      color="info">
                          <template v-slot:label>
                            <span class="text--accent">Passwort wiederholen</span>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>

                  </v-card-text>
                  <v-card-actions>
                    <v-row>
                      <v-col cols="auto" class="pa-5">
                        <v-btn block color="primary" class="text--font text-none" @click="resetPassword">Zurücksetzen</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

          </v-col>

        </v-row>

      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>


import {mapActions} from "vuex";


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
        password:"",
        passwordconfirmation:"",
      }
    }
  },
  computed: {
    token() {
      return this.$route.query.token
    },
    resetPayload() {
      return {
        mail: this.login.mail,
        password: this.login.password,
        passwordconfirmation: this.login.passwordconfirmation,
        token: this.token,
      }
    },
  },
  methods:{
    ...mapActions({
      updateForgottenPassword: 'auth/updateForgottenPassword',
    }),
    resetPassword(){
      this.updateForgottenPassword(this.resetPayload)
    },
  }
}
</script>
