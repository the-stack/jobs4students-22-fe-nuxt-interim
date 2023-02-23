import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';

export const state = () => (
  {
    lang: 'de', // TODO: an eine Stelle setzen

    id: null,
    dossier: null,
    token: null,
    token_expires: null,
    token_refresh: null,
    is_authenticated: false,
    email: null,
    dossierBlueprint: {
      user_id: null,
      gender_id: null,
      firstname: null,
      lastname: null,
      birthdate: null,
      street1: null,
      street2: null,
      zip: null,
      city: null,
      country: null,
      invoice_company: null,
      invoice_firstname: null,
      invoice_lastname: null,
      invoice_street1: null,
      invoice_street2: null,
      invoice_zip: null,
      invoice_city: null,
      invoice_country: null,
      is_teacher: false,
      is_admin: false,
    },
    registerCourseId: null,
  }
);
export const mutations = {
  updateField, // vuex-map-fields
  setUser(state, payload) {
    state.is_authenticated = true;
    state.token = payload.access_token;
    state.token_expires = payload.expires_in || null;
    state.token_refresh = payload.refresh_token || null;
    state.email = payload.user.email;
    state.id = payload.user.id;
    state.dossier = payload.user.dossier;
  },
  setLogoutUser(state) {
    state.is_authenticated = false;
    state.id = null;
    state.dossier = null;
    state.token = null;
    state.token_refresh = null;
    state.token_expires = null;
    state.email = null;
  },
  setDossier(state, payload) {
    state.dossier = payload;
  }
}
export const getters = {
  getField, //vuex-map-fields
}
export const actions = {
  loginUser(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      data: {
        query: `mutation {
                          login(
                              input: {
                                  password: "${payload.password}",
                                  username: "${payload.email}"
                                  }
                          ) {
                                access_token
                                expires_in
                                refresh_token
                                token_type
                                user {
                                        id
                                        email
                                        dossier {
                                                  id
                                                  firstname
                                                  lastname
                                                  birthdate
                                                  gender {
                                                            id
                                                            title
                                                  }
                                                  street1
                                                  street2
                                                  zip
                                                  city
                                                  country
                                                  invoice_company
                                                  invoice_firstname
                                                  invoice_lastname
                                                  invoice_street1
                                                  invoice_street2
                                                  invoice_zip
                                                  invoice_city
                                                  invoice_country
                                                  is_admin
                                                  is_teacher
                                        }
                                }
                            }
                          }`
      },
    }).then(response => {
      if (response.data) {
        context.commit('setUser', response.data.data.login)
        window.localStorage.setItem('token', response.data.data.login.access_token)
        if (response.data.data.login.user.dossier) {
          if (!context.state.registerCourseId) {
            this.$router.push({path: '/dashboard'})
          }
        } else {
          this.$router.push({path: '/account/dossiercreate'})
        }
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at login: ');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  logoutUser(context) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: `mutation {
                          logout {
                                message
                                status
                            }
                          }`
      },
    }).then(response => {
      if (response.data) {
        context.commit('setLogoutUser');
        window.localStorage.removeItem('token')
        this.$router.push({path: '/'})
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at login: ');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  register(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: `mutation {
                          register(
                              input: {
                                  email: "${payload.email}",
                                  name: "${payload.userName}"
                                  password: "${payload.password}"
                                  password_confirmation: "${payload.password_confirmation}"
                                  }
                          ) {
                                tokens {
                                    access_token
                                    expires_in
                                    refresh_token
                                    token_type
                                    user {
                                            id
                                            email
                                            dossier {
                                                      id
                                                      firstname
                                                      lastname
                                                      birthdate
                                                      gender {
                                                                id
                                                                title
                                                      }
                                                      street1
                                                      street2
                                                      zip
                                                      city
                                                      country
                                                      invoice_company
                                                      invoice_firstname
                                                      invoice_lastname
                                                      invoice_street1
                                                      invoice_street2
                                                      invoice_zip
                                                      invoice_city
                                                      invoice_country
                                                      is_admin
                                                      is_teacher
                                            }
                                    }
                                }
                            }
                          }`
      },
    }).then(response => {
      if (response.data) {
        context.commit('setUser', response.data.data.register.tokens)
        this.$router.push({path: '/account/dossiercreate'})
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at signup: ' + response.data.errors);
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  readMe(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + payload,
      },
      data: {
        query: `{
                          me {
                                id
                                email
                                dossier {
                                          id
                                          firstname
                                          lastname
                                          birthdate
                                          gender {
                                                    id
                                                    title
                                          }
                                          street1
                                          street2
                                          zip
                                          city
                                          country
                                          invoice_company
                                          invoice_firstname
                                          invoice_lastname
                                          invoice_street1
                                          invoice_street2
                                          invoice_zip
                                          invoice_city
                                          invoice_country
                                          is_admin
                                          is_teacher
                                }
                                registrations {
                                  id
                                  course {
                                    id
                                    title
                                  }
                                }
                            }
                          }`
      },
    }).then(response => {
      if (response.data) {
        let user = {
          user: response.data.data.me,
          token: payload
        }
        context.commit('setUser', user)
        if (!user.user.dossier) {
          this.$router.push({path: '/account/dossiercreate'})
        }
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at login: ');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  //DOSSIER
  dossierCreate(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: `mutation {
                          dossierCreate(
                                  user_id:${payload.user_id},
                                  gender_id:${payload.gender_id},
                                  firstname:"${payload.firstname}",
                                  lastname:"${payload.lastname}",
                                  birthdate:"${payload.birthdate}",
                                  street1:"${payload.street1}",
                                  street2:"${payload.street2}",
                                  zip:"${payload.zip}",
                                  city:"${payload.city}",
                                  country:"${payload.country}",
                                  invoice_company:"${payload.invoice_company}",
                                  invoice_firstname:"${payload.invoice_firstname}",
                                  invoice_lastname:"${payload.invoice_lastname}",
                                  invoice_street1:"${payload.invoice_street1}",
                                  invoice_street2:"${payload.invoice_street2}",
                                  invoice_zip:"${payload.invoice_zip}",
                                  invoice_city:"${payload.invoice_city}",
                                  invoice_country:"${payload.invoice_country}",
                                  is_teacher:false,
                                  is_admin:false
                                  ) {
                                      id
                                      firstname
                                      lastname
                                      birthdate
                                      gender {
                                                id
                                                title
                                      }
                                      street1
                                      street2
                                      zip
                                      city
                                      country
                                      invoice_company
                                      invoice_firstname
                                      invoice_lastname
                                      invoice_street1
                                      invoice_street2
                                      invoice_zip
                                      invoice_city
                                      invoice_country
                                      is_admin
                                      is_teacher
                                      }
                          }`
      },
    }).then(response => {
      if (response.data) {
        context.commit('setDossier', response.data.data.dossierCreate)
        if (context.state.registerCourseId) {
          this.$router.push({path: '/lehrgang/anmeldung/' + context.state.registerCourseId})
        } else {
          this.$router.push({path: '/dashboard'})
        }
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating dossier: ' + response.data.errors);
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  //PASSWORD
  forgotPassword(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: `mutation {
                          forgotPassword(
                              input: {
                                  email: "${payload.email}"
                                  }
                          ) {
                                message
                                status
                            }
                          }`
      },
    }).then(response => {
      if (response.data) {
        context.commit('setSnackbarMessage', {
          color: 'secondary',
          msg: 'Wir haben Dir soeben ein Mail mit einem Link zum Zurücksetzen des Passworts gesendet.'
        }, {root: true});
        this.$router.push({path: '/account/passwordconfirm'})
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at forgot password');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  //REGISTRATIONS
  registrationCreate(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: `mutation {
                          registrationCreate(
                                  user_id:${payload.user_id},
                                  course_id:${payload.course_id}
                                  ) {
                                      id
                                      }
                          }`
      },
    }).then(response => {
      if (response.data) {
        this.$router.push({path: '/lehrgang/anmeldung/welcome'})
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating registration: ' + response.data.errors);
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },

  // Invoice PDF (Rolf)
  pdfInvoice({state}) {
    let query = `query {
                    pdfinvoice(id:1)
      }`;
    const filename = `test.pdf`;
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + state.token,
      },
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      var a = document.createElement('a'); //Create <a>
      a.href = 'data:application/pdf;base64,' + response.data.data.pdfinvoice; //Image Base64 Goes here
      a.download = filename;
      a.click(); //Downloaded file
    });
  },
}
