<template>
  <v-container fluid class="pa-0">
    <v-form v-model="valid">
      <v-sheet class="transparent">
        <v-container>
          <v-row dense class="my-4 my-sm-10 my-md-16" justify="space-between">
            <v-col cols="12" sm="10">
              <v-row>
                <v-col cols="12">
                  <v-card class="mb-1" flat color="transparent">
                    <v-card-title class="px-0">Passwort zurücksetzen</v-card-title>
                  </v-card>

                  <v-card v-if="!passwordResetSent">
                    <v-card-text>
                      <v-row class="pt-5">
                        <v-col cols="12">
                          <v-text-field v-model="login.mail"
                                        :rules="emailRules"
                                        required
                                        dense
                                        color="info">
                            <template v-slot:label>
                              <span class="text--accent">E-Mail-Adresse</span>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="auto" class="pa-5">
                          <v-btn
                            :disabled="!valid"
                            block color="primary" class="text--font text-none" @click="resetPassword">Passwort zurücksetzen</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>

                  <v-card v-if="passwordResetSent">
                    <v-card-text>
                      Wir haben an die Adresse {{login.mail}} eine E-Mail mit dem Link zum Rücksetzen Deines Passworts gesendet.
                    </v-card-text>
                  </v-card>

                </v-col>
              </v-row>

            </v-col>

          </v-row>
        </v-container>
      </v-sheet>
    </v-form>
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
        password:""
      },
      passwordResetSent: false,
      // Validation
      valid: false,
      emailRules: [
        v => !!v || 'E-mail Adresse benötigt',
        v => /.+@.+/.test(v) || 'E-mail muss eine gültige Adresse sein',
      ],
    }
  },
  methods:{
    ...mapActions({
      loginUserAction: 'auth/login',
      forgotPassword: 'auth/forgotPassword',
    }),
    loginUser() {
      let payload = {username: this.login.mail, password: this.login.password}
      this.loginUserAction(payload)
    },
    resetPassword(){
      this.forgotPassword(this.login.mail).then(response => {
        this.passwordResetSent = true
      }).catch(err => {
        console.log(err)
      });
    },
  }
}
</script>
