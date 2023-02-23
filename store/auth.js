import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';

export const state = () => (
  {
    lang: 'de', // TODO: an eine Stelle setzen
    tokens: {
      access_token: null,
      refresh_token: null,
    },
    isLoggedIn: false,
    tempPassswordChangeMessage: false
  }
);
export const mutations = {
  updateField, // vuex-map-fields

  setTokens(state, payload) {
    state.tokens = payload
    if (payload.access_token) {
      localStorage.setItem('j4s-jwt-a', payload.access_token);
      localStorage.setItem('j4s-jwt-r', payload.refresh_token);
    } else {
      localStorage.removeItem('j4s-jwt-a');
      localStorage.removeItem('j4s-jwt-r');
    }
  },
  setIsLoggedIn(state, payload) {
    state.isLoggedIn = payload
  },
  setTempPassswordChangeMessage(state) {
    state.tempPassswordChangeMessage = true
  }

}
export const getters = {
  getField, //vuex-map-fields
  getTokenHeader: (state) => { return {Authorization: 'Bearer ' + state.tokens.access_token}},
}
export const actions = {

  /**
   * @param context Context.
   * @param payload Login Payload.
   * @param payload.username The username/email of the user.
   * @param payload.password The password of the user.
   */
  login(context, payload) {
    let query = `mutation {
                                login( input: {
                                    username:"${payload.username}"
                                    password: "${payload.password}"
                                }) {
                                    access_token
                                    refresh_token
                                    user {
                                        id
                                        role_id
                                    }
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data && response.data.data && response.data.data.login) {
        let tokens = {access_token: response.data.data.login.access_token, refresh_token: response.data.data.login.refresh_token}
        context.commit('setTokens', tokens);
        context.dispatch('me/readUserMe', null, {root: true}).then(() => {
          context.commit('setIsLoggedIn', true);
          // check if user has selected a job before
          if (context.rootState.me.vacancyStorage) {
            this.$router.push('/job/' + context.rootState.me.vacancyStorage)
            context.commit('me/resetVacancyStorage', null, {root: true})
          } else if (context.rootState.me.userData.role_id === 1) {
            this.$router.push('/profile-student')
          } else {
            this.$router.push('/profile-company')
          }
        })
      } else {
        throw new Error();
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: 'Bitte überprüfe deine Login-Daten. Hinweis: aufgrund einer Systemumstellung mussten wir alle Passwörter zurücksetzen. Bitte generiere dir doch mit dem "Passwort vergessen" Link ein neues Passwort.', color: 'error'}, {root: true});
      context.commit('setTempPassswordChangeMessage')
      throw new Error(err);
    });
  },
  logout(context) {
    let header = {
      Authorization: 'Bearer ' + context.rootState.auth.tokens.access_token,
    }
    let query = `mutation {
                                logout {
                                    status
                                    message
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: header,
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data.data) {
        context.commit('setIsLoggedIn', false);
        context.commit('me/resetVacancyStorage', null, {root: true})
        let tokens = {access_token: null, refresh_token: null}
        context.commit('setTokens', tokens);
        context.commit('me/resetUser', null, {root: true})
        this.$router.push('/login')
      } else {
        throw new Error('at logging out');
      }
    }).catch(err => {
      let tokens = {access_token: null, refresh_token: null}
      context.commit('setTokens', tokens);
      context.commit('me/resetUser', null, {root: true})
      this.$router.push('/login')
      throw new Error(err);
    });
  },
  forgotPassword(context, payload) {
    let query = `mutation {
                        forgotPassword (
                            input: {
                                email: "${payload}"
                            }
                        )
                        {
                            status
                            message
                        }
                    }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: query,
      },
    }).then(response => {
      context.commit('setSnackbarMessage', {msg: "Mail gesendet.", color: 'secondary'}, {root: true});
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: "Fehler beim Versenden des Mails.", color: 'error'}, {root: true});
    });
  },
  updateForgottenPassword(context, payload) {
    let query = `mutation {
                        updateForgottenPassword(
                            input: {
                                email:"${payload.mail}"
                                token:"${payload.token}"
                                password:"${payload.password}"
                                password_confirmation:"${payload.passwordconfirmation}"
                            }
                        )
                        {
                            status
                            message
                        }
                    }`
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data.data) {
        context.commit('setSnackbarMessage', {msg: "Das Passwort wurde erfolgreich geändert. Du kannst dich nun neu einloggen.", color: 'secondary'}, {root: true});
        this.$router.push('/login')
      } else {
        throw new Error();
      }
    }).catch(err => {
      let msg = 'Fehler beim Zurücksetzen des Passworts. Entweder stimmt die E-Mail Adresse nicht oder das Passwort ist kleiner al 8 Zeichen.'
      context.commit('setSnackbarMessage', {msg: msg, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },


  register(context, payload) {
    let query = `mutation {
                                register( input: {
                                    name:"${context.rootState.me.userData.firstname + ' ' + context.rootState.me.userData.lastname}"
                                    firstname:"${context.rootState.me.userData.firstname}"
                                    lastname:"${context.rootState.me.userData.lastname}"
                                    gender_id:${context.rootState.me.userData.gender_id}
                                    role_id:${payload.role_id}
                                    email: "${context.rootState.me.userData.email}"
                                    password: "${context.rootState.me.userData.password}"
                                    password_confirmation: "${context.rootState.me.userData.password}"
                                    company_id: ${context.rootState.me.userData.company_id ? context.rootState.me.userData.company_id : null}
                                }) {
                                    tokens {
                                        access_token
                                        refresh_token
                                        expires_in
                                        token_type
                                        user {
                                            id
                                            dossier {
                                                id
                                            }
                                        }
                                    }
                                }
                            }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data.data && response.data.data.register) {

        // do we have an access_token? if yes: set it and log in
        // note: if email verification is required, we don't get a token

        if (response.data.data.register.tokens.access_token) {
          // Set the tokens
          context.commit('setTokens', response.data.data.register.tokens);

          // set basic User Object data
          let mutationPayload = {
            user_id: response.data.data.register.tokens.user.id,
            dossier_id: response.data.data.register.tokens.user.dossier.id,
          }
          context.commit('me/registerMutations', mutationPayload, {root: true}, )

          // check if it's a student or a company account (obsolete)
          if (!context.rootState.me.userData.company_id) {
            context.commit('setSnackbarMessage', {msg: "User wurde erfolgreich erstellt.", color: 'secondary'}, {root: true});
          } else {
            //router.push('/profile-company')
          }

        }

      } else if (response.data.errors) {
        // Check for errors and provide error message
        // not possible to return this from the Backend @rule because translation of attribute itself is not possible
        let errMessage = ''
        if (response.data.errors[0].extensions.validation && response.data.errors[0].extensions.validation['input.email']) {
          errMessage = errMessage + 'E-Mail bereits vorhanden oder ungültig. '
        }
        if (response.data.errors[0].extensions.validation && response.data.errors[0].extensions.validation['input.password']) {
          errMessage = errMessage + 'Das Passwort muss mindestens 8 Zeichen enthalten.'
        }
        throw new Error(errMessage);

      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  emailVerify(context, payload) {
    let query = `mutation {
                        verifyEmail(input: {
                            token: "${payload}"
                        }) {
                        access_token
                        refresh_token
                        user {
                            id
                            name
                            email
                            role_id
                        }
                    }
                }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data && response.data.data && response.data.data.verifyEmail) {
        if (response.data.data.verifyEmail.user.role_id === 2) {
          //router.push('/profile-user')
          return response
        } else {
          let tokens = {access_token: response.data.data.verifyEmail.access_token, refresh_token: response.data.data.verifyEmail.refresh_token}
          context.commit('setTokens', tokens);
          context.dispatch('me/readUserMe', null, {root: true}).then(() => {
            //router.push('/profile-user')
          })
        }

      } else {
        throw new Error();
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: 'Bitte überprüfe deine Login-Daten.', color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

}
