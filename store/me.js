import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';
import _cloneDeep from 'lodash/cloneDeep';

export const state = () => (
  {
    lang: 'de', // TODO: an eine Stelle setzen
    userData: {},

    userDataBlueprint: {
      id: null,
      name: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      status_id: null,
      role_id: null,
      company_id: null,
      company: {
        id: null,
        name: '',
        email: '',
        desc: '',
        street1: '',
        street2: '',
        zip: null,
        city: '',
        country_id: '',
        profile_complete: false,
        country: {
          code: '',
          title_i18n: {
            de: '',
          }
        },
        profilepicture: {
          id: null,
          filetype_id: null,
          publicurl: '',
          storageurl: '',
          created_at: '',
          updated_at: ''
        },
      },
      tc: false,
      settings_no_vacancymails: false,
      gender_id: 1,
      avatar: '',
      created_at: null,
      updated_at: null,
      dossier: {
        id: null,
        birthdate: '',
        street1: '',
        street2: '',
        zip: null,
        city: '',
        country_id: null,
        country: {
          code: '',
          title_i18n: {
            de: '',
          }
        },
        nationality_id: null,
        nationality: {
          code: '',
          title_i18n: {
            de: '',
          }
        },
        phone: '',
        mobile: '',
        permit_id: null,
        permit: {
          code: '',
          title_i18n: {
            de: '',
          }
        },
        marital_id: '',
        marital: {
          code: '',
          title_i18n: {
            de: '',
          }
        },
        shift: null,
        car: null,
        bike: null,
        publictransport: null,
        radius: 1,
        jobzip: 1,
        notes: '',
        skills: '',
        languages: [],
        uploads: [],
        availabilities: [
          {
            workload_from: null,
            workload_to: null,
            vacancytype_id: null,
            date_from: null,
            date_to: null,
          }
        ],
        qualifications: [],
        profilepicture: {
          id: null,
          filetype_id: null,
          publicurl: '',
          storageurl: '',
          created_at: '',
          updated_at: ''
        },
        created_at: '',
        updated_at: '',
      },
      vacancies: [],
      applications: [],
    },

    unsaved: {
      profile: false,
      searching: false,
      address: false,
      education: false,
      language: false,
      skill: false,
      upload: false,
    },

    tokens: {
      access_token: null,
      refresh_token: null,
    },

    currentAvailability: {
      workload_from: null,
      workload_to: null,
      vacancytype_id: null,
      from: null,
      to: null
    },
    currentUpload:{
      file:null,
      base64:null,
      //filetype: null,
    },
    currentUploadBlueprint:{
      file:null,
      base64:null,
      //filetype: null,
    },
    vacancyFilter: {
      vacancytypes: [],
      qualificationtypes: [],
    },
    vacancyStorage: null
  }
);
export const mutations = {
  updateField, // vuex-map-fields

  setUser(state, payload) {
    state.userData = payload
  },
  setUserId(state, payload) {
    state.userData.id = payload;
  },

  resetVacancyStorage(state) {
    state.vacancyStorage = null
  },

  resetUser(state, payload) {
    state.userData = state.userDataBlueprint
  },

  registerMutations(state, payload) {
    state.userData.id = payload.user_id
    state.userData.dossier.id = payload.dossier_id
  },

  //DOSSIER
  setDossierId(state, payload) {
    state.userData.dossier.id = payload;
  },

  //AVAILABILITY
  addAvailability(state, payload) {
    state.userData.dossier.availabilities.push(payload)
  },
  addLanguage(state, payload) {
    state.userData.dossier.languages.push(payload)
  },
  removeLanguage(state, payload) {
    state.userData.dossier.languages = state.userData.dossier.languages.filter(function( obj ) {
      return obj.id !== payload;
    });
  },
  addQualification(state, payload) {
    state.userData.dossier.qualifications.push(payload)
  },

  resetUnsaved(state, payload) {
    state.unsaved[payload] = false
  },

  cloneUserData(state) {
    //console.log('initializing user data object')
    state.userData = _cloneDeep( state.userDataBlueprint )
  },
  cloneCurrentUpload(state) {
    //console.log('initializing currentUpload object')
    state.currentUpload = _cloneDeep( state.currentUploadBlueprint )
  },

}
export const getters = {
  getField, //vuex-map-fields
  getAvailabilitesForGraphQlUpsert: (state) => {
    if (state.userData.role_id === 1) { // only return values if it's a student account
      let availabilites = ''
      if (state.userData.dossier.availabilities.length>0) {
        availabilites = `availabilities: {
                              upsert: [`
        state.userData.dossier.availabilities.forEach(function(item){
          availabilites = availabilites + `
                                  {
                                      id: ${item.id ? item.id : 0}
                                      vacancytype_id: ${item.vacancytype_id ? item.vacancytype_id : 0}
                                      date_from: "${item.date_from}"
                                      date_to: "${item.date_to}"
                                      workload_from: ${item.workload_from}
                                      workload_to: ${item.workload_to}
                                  },`
        })
        availabilites = availabilites + `
                           ]
                      }`
      }
      return availabilites
    } else {
      return ''
    }
  },

  getLanguagesForGraphqlSync: (state) => {
    if (state.userData.role_id === 1) { // only return values if it's a student account
      let languages = ''
      if (state.userData.dossier.languages) {
        languages = `languages: {
                          sync: [`
        state.userData.dossier.languages.forEach(function(item){
          languages = languages + `
                            {
                              id: ${item.id}
                              oral_languagelevel_id: ${item.pivot.oral_languagelevel_id}
                              written_languagelevel_id: ${item.pivot.written_languagelevel_id}
                            },`
        })
        languages = languages + `
                        ]
                    }`
      }
      return languages
    } else {
      return ''
    }

  }
}
export const actions = {
//USER
  readUserMe(context) {
    let query = `{
                        me
                          {
                            id
                            name
                            email
                            firstname
                            lastname
                            status_id
                            role_id
                            company_id
                            company {
                                id
                                name
                                email
                                desc
                                street1
                                street2
                                zip
                                city
                                country_id
                                profilepicture {
                                    id
                                    filetype_id
                                    publicurl
                                    storageurl
                                    created_at
                                    updated_at
                                }
                                abo_id
                                abo {
                                    id
                                    title_i18n {
                                        de
                                    }
                                    vacancies_active
                                    vacancies_inactive
                                    vacancies_active_available
                                    vacancies_active_max
                                    price_month
                                    price_year
                                }
                                abo_enddate
                                has_active_abo
                                profile_complete
                                users_count
                                vacancies {
                                  id
                                  user_id
                                  title
                                  desc
                                  workplace
                                  tasks
                                  requirements
                                  company1
                                  company2
                                  contact
                                  street1
                                  street2
                                  zip
                                  city
                                  email
                                  workload_from
                                  workload_to
                                  limited
                                  published
                                  vacancytype_id
                                  qualificationtype_id
                                  qualificationtype {
                                      id
                                      title_i18n {
                                          de
                                      }
                                      is_study
                                      is_profession
                                  }
                                  profession_id
                                  profession {
                                      id
                                      title_i18n {
                                          de
                                      }
                                  }
                                  study_id
                                  study {
                                      id
                                      title_i18n {
                                          de
                                      }
                                  }
                                  date_from
                                  date_to
                                  profilepicture {
                                      id
                                      filetype_id
                                      filetype {
                                          id
                                          code
                                          title_i18n {
                                              de
                                          }
                                      }
                                      fileable_id
                                      fileable_type
                                      publicurl
                                      storageurl
                                      created_at
                                      updated_at
                                  }
                                  created_at
                                  updated_at
                                }
                            }
                            tc
                            settings_no_vacancymails
                            gender_id
                            avatar
                            email_verified_at
                            created_at
                            updated_at
                            dossier {
                                id
                                birthdate
                                street1
                                street2
                                zip
                                city
                                country_id
                                country {
                                    code
                                    title_i18n {
                                        de
                                    }
                                }
                                nationality_id
                                nationality {
                                    code
                                    title_i18n {
                                        de
                                    }
                                }
                                phone
                                mobile
                                permit_id
                                permit {
                                    code
                                    title_i18n {
                                        de
                                    }
                                }
                                marital_id
                                marital {
                                    code
                                    title_i18n {
                                        de
                                    }
                                }
                                shift
                                car
                                bike
                                publictransport
                                radius
                                jobzip
                                notes
                                skills
                                languages {
                                    id
                                    code
                                    title_i18n {
                                        de
                                    }
                                    pivot {
                                        oral_languagelevel_id
                                        oral_languagelevel {
                                            id
                                            title_i18n {
                                                de
                                            }
                                        }
                                        written_languagelevel_id
                                        written_languagelevel {
                                            id
                                            title_i18n {
                                                de
                                            }
                                        }
                                    }
                                }
                                files {
                                    id
                                    desc
                                    filetype_id
                                    filetype {
                                        id
                                        code
                                        title_i18n {
                                            de
                                        }
                                    }
                                    publicurl
                                    storageurl
                                    created_at
                                    updated_at
                                }
                                profilepicture {
                                    id
                                    filetype_id
                                    publicurl
                                    storageurl
                                    created_at
                                    updated_at
                                }
                                qualifications {
                                    id
                                    qualificationtype_id
                                    qualificationtype {
                                        id
                                        title_i18n { de }
                                        is_study
                                        is_profession
                                    }
                                    study_id
                                    study {
                                        id
                                        title_i18n { de }
                                    }
                                    profession_id
                                    profession {
                                        id
                                        title_i18n { de }
                                    }
                                    desc
                                    year
                                }
                                availabilities {
                                    id
                                    vacancytype_id
                                    vacancytype {
                                        id
                                        code
                                        title_i18n {
                                            de
                                        }
                                    }
                                    date_from
                                    date_to
                                    workload_from
                                    workload_to
                                    created_at
                                    updated_at
                                }
                                created_at
                                updated_at
                            }
                            vacancies {
                                id
                                user_id
                                title
                                desc
                                workplace
                                tasks
                                requirements
                                company1
                                company2
                                contact
                                street1
                                street2
                                zip
                                city
                                email
                                workload_from
                                workload_to
                                limited
                                published
                                vacancytype_id
                                qualificationtype_id
                                qualificationtype {
                                    id
                                    title_i18n {
                                        de
                                    }
                                    is_study
                                    is_profession
                                }
                                profession_id
                                profession {
                                    id
                                    title_i18n {
                                        de
                                    }
                                }
                                study_id
                                study {
                                    id
                                    title_i18n {
                                        de
                                    }
                                }
                                date_from
                                date_to
                                profilepicture {
                                    id
                                    filetype_id
                                    filetype {
                                        id
                                        code
                                        title_i18n {
                                            de
                                        }
                                    }
                                    fileable_id
                                    fileable_type
                                    publicurl
                                    storageurl
                                    created_at
                                    updated_at
                                }
                                created_at
                                updated_at
                            }
                            applications {
                              vacancy_id
                              comment
                              created_at
                              updated_at
                            }
                          }
                        }`
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data && response.data.data && response.data.data.me && response.data.data.me.id) {
        context.commit('setUser', response.data.data.me)
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },

  userUpdate(context) {

    let companyUpdate = ''
    if (context.state.userData.company_id) {
      companyUpdate = `
                                company: {
                                    update: {
                                        id: ${context.state.userData.company_id}
                                        ${context.state.userData.company.name !== null ? 'name: "' + context.state.userData.company.name + '"' : ''}
                                        ${context.state.userData.company.email !== null ? 'email: "' + context.state.userData.company.email + '"' : ''}
                                        ${context.state.userData.company.street1 !== null ? 'street1: "' + context.state.userData.company.street1 + '"' : ''}
                                        ${context.state.userData.company.street2 !== null ? 'street2: "' + context.state.userData.company.street2 + '"' : ''}
                                        ${context.state.userData.company.zip !== null && context.state.userData.company.zip !== '' ? 'zip: ' + context.state.userData.company.zip : 'zip: null'}
                                        ${context.state.userData.company.city !== null ? 'city: "' + context.state.userData.company.city + '"' : ''}
                                        country_id: ${context.state.userData.company.country_id ? context.state.userData.company.country_id : null}
                                    }
                                }`
    }
    let query = `mutation {
                        userUpdate(
                            input:
                            {
                                id: ${context.state.userData.id}
                                firstname: "${context.state.userData.firstname}"
                                lastname: "${context.state.userData.lastname}"
                                email: "${context.state.userData.email}"
                                tc: ${context.state.userData.tc}
                                settings_no_vacancymails: ${context.state.userData.settings_no_vacancymails}
                                gender_id: ${context.state.userData.gender_id}
                                dossier: {
                                    update: {
                                        id: ${context.state.userData.dossier.id}
                                        ${context.state.userData.dossier.birthdate ? 'birthdate: "' + context.state.userData.dossier.birthdate + '"' : ''}
                                        street1: "${context.state.userData.dossier.street1}"
                                        street2: "${context.state.userData.dossier.street2}"
                                        zip: ${context.state.userData.dossier.zip ? context.state.userData.dossier.zip : null}
                                        city: "${context.state.userData.dossier.city}"
                                        country_id: ${context.state.userData.dossier.country_id ? context.state.userData.dossier.country_id : null}
                                        nationality_id: ${context.state.userData.dossier.nationality_id ? context.state.userData.dossier.nationality_id : null}
                                        permit_id: ${context.state.userData.dossier.permit_id ? context.state.userData.dossier.permit_id : null}
                                        phone: "${context.state.userData.dossier.phone}"
                                        mobile: "${context.state.userData.dossier.mobile}"
                                        shift: ${context.state.userData.dossier.shift ? context.state.userData.dossier.shift : null}
                                        car: ${context.state.userData.dossier.car ? context.state.userData.dossier.car : null}
                                        bike: ${context.state.userData.dossier.bike ? context.state.userData.dossier.bike : null}
                                        publictransport: ${context.state.userData.dossier.publictransport ? context.state.userData.dossier.publictransport : null}
                                        radius: ${context.state.userData.dossier.radius ? context.state.userData.dossier.radius : null}
                                        jobzip: ${context.state.userData.dossier.jobzip ? context.state.userData.dossier.jobzip : null}
                                        skills: """${context.state.userData.dossier.skills}"""
                                        notes: "${context.state.userData.dossier.notes}"
                                        ${context.getters.getAvailabilitesForGraphQlUpsert}
                                        ${context.getters.getLanguagesForGraphqlSync}
                                    }
                                }
                                ${companyUpdate}
                            }
                        )
                        {
                            id
                        }
                    }`
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data.errors) {
        let message = 'Fehler beim Aktualisieren des Profils. Vermutlich ist die Mail-Adresse bereits in Verwendung.'
        context.commit('setSnackbarMessage', {msg: message, color: 'secondary'}, {root: true});
      } else if (response.data) {
        let message = 'Profil wurde erfolgreich aktualisiert.'
        context.dispatch('readUserMe')
        context.commit('setSnackbarMessage', {msg: message, color: 'primary'}, {root: true});
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at updating User');
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  meDelete(context) {
    let query = `mutation {
                        userDelete(
                            id: ${context.state.userData.id}
                        )
                        {
                            id
                        }
                    }`
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      let tokens = {access_token: null, refresh_token: null}
      context.commit('auth/setTokens', tokens, {root: true});
      context.commit('me/resetUser', null, {root: true})
      context.commit('setSnackbarMessage', {msg: "Konto erfolgreich gelöscht.", color: 'secondary'}, {root: true});
      this.$router.push('/')
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  languageUpdate(context) {
    let languages = ''
    // prepare languages
    if (context.state.userData.dossier.languages) {
      languages = `languages: {
                sync: [`
      context.state.userData.dossier.languages.forEach(function(language){
        //console.log(language)
        languages = languages + `
                    {
                        id: ${language.id}
                        oral_languagelevel_id: ${language.pivot.oral_languagelevel_id}
                        written_languagelevel_id: ${language.pivot.written_languagelevel_id}
                    },`
      })
      languages = languages + `
                ]
            }`
    }



    let query = `mutation {
                        userUpdate(
                            input:
                            {
                                id: ${context.state.userData.id}
                                dossier: {
                                    update: {
                                        id: ${context.state.userData.dossier.id}
                                        ${languages}
                                    }
                                }
                            }
                        )
                        {
                            id
                        }
                    }`
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data.data) {
        context.dispatch('readUserMe');
        context.commit('setSnackbarMessage', {msg: "Sprachen wurden erfolgreich aktualisiert.", color: 'secondary'}, {root: true});
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at updating User');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  readUserPermissions(context, payload) {

    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: `{ user(email: ${payload})
                  {
                    id
                    email
                    dossier {
                        id
                    }
                    name
                    firstname
                    lastname
                  }
                }`,
      },
    }).then(response => {
      if (response.data) {
        return response
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at loading userme');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  //DOSSIER
  companyCreate(context) {
    let query = `mutation {
                                companyCreate(
                                    name: "${context.state.userData.company.name}"
                                ) {
                                    id
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
      if (response.data) {
        return response.data
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating dossier');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  //DOSSIER
  dossierCreate(context) {
    let birthdate = context.state.userData.dossier.birthdate ? JSON.stringify(context.state.userData.dossier.birthdate + '00:00:00') : null;
    let query = `mutation {
                                dossierCreate(
                                    user_id:${context.state.userData.id}
                                    birthdate:${birthdate}
                                    street1: ${context.state.userData.dossier.street1 ? '"' + context.state.userData.dossier.street1 + '"' : ''}
                                    street2: ${context.state.userData.dossier.street2 ? '"' + context.state.userData.dossier.street2 + '"' : ''}
                                    zip: ${context.state.userData.dossier.zip ? '"' + context.state.userData.dossier.zip + '"' : ''}
                                    city: ${context.state.userData.dossier.city ? '"' + context.state.userData.dossier.city + '"' : ''}
                                    country_id: ${context.state.userData.dossier.country_id}
                                    nationality_id: ${context.state.userData.dossier.nationality_id}
                                    phone: ${context.state.userData.dossier.phone ? '"' + context.state.userData.dossier.phone + '"' : ''}
                                    mobile: ${context.state.userData.dossier.mobile ? '"' + context.state.userData.dossier.mobile + '"' : ''}
                                    shift: ${context.state.userData.dossier.shift}
                                    car: ${context.state.userData.dossier.car}
                                    bike: ${context.state.userData.dossier.bike}
                                    publictransport: ${context.state.userData.dossier.publictransport}
                                    radius: ${context.state.userData.dossier.radius}
                                    jobzip: ${context.state.userData.dossier.jobzip}
                                    notes: ${context.state.userData.dossier.notes ? '"' + context.state.userData.dossier.notes + '"' : ''}
                                    skills: ${context.state.userData.dossier.skills ? '"""' + context.state.userData.dossier.skills + '"""' : ''}
                                ) {
                                    id
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.commit('setDossierId', response.data.data.dossierCreate.id);
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating dossier');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  //APPLICATION
  applicationCreate(context, payload) {
    let query = `mutation {
                                applicationCreate(
                                    user_id:${context.state.userData.id}
                                    vacancy_id:${payload.vacancy_id}
                                    comment:"${payload.comment}"

                                ) {
                                    id
                                }
                            }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data && response.data.data) {
        context.dispatch('readUserMe');
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });

  },
  //AVAILABILITY
  availabilityCreate(context, payload) {
    let query = `mutation {
                                availabilityCreate(
                                    dossier_id:${context.state.userData.dossier.id}
                                    date_from:"${payload.date_from}"
                                    date_to:"${payload.date_to}"
                                    vacancytype_id:${payload.vacancytype_id}
                                    workload_from:${payload.workload_from ? payload.workload_from : null}
                                    workload_to:${payload.workload_to ? payload.workload_to : null}
                                ) {
                                    id
                                    date_from
                                    date_to
                                    vacancytype_id
                                    workload_from
                                    workload_to
                                }
                            }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data) {
        context.dispatch('readUserMe');
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  availabilityDelete(context, payload) {

    let query = `mutation {
                                availabilityDelete(
                                    id:${payload}
                                ) {
                                    id
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.dispatch('readUserMe');
        context.commit('setSnackbarMessage', {msg: "Eintrag wurde erfolgreich gelöscht.", color: 'secondary'}, {root: true});
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at deleting Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  // QUALIFICATIONS
  // add qualifications one by one, as based on the process it doesn't make sense to CREATE them via nested mutation
  qualificationCreate(context, payload) {

    let query = `mutation {
                                qualificationCreate(
                                    dossier_id:${context.state.userData.dossier.id}
                                    qualificationtype_id: ${payload.qualificationtype.id ? payload.qualificationtype.id : null}
                                    study_id: ${payload.study_id ? payload.study_id : null}
                                    profession_id: ${payload.profession_id ? payload.profession_id : null}
                                    desc: ${payload.desc ? '"' + payload.desc + '"' : '""'}
                                    year: ${payload.year ? payload.year : null}
                                ) {
                                    id
                                    dossier_id
                                    qualificationtype_id
                                    qualificationtype {
                                        id
                                        title_i18n { de }
                                        is_study
                                        is_profession
                                    }
                                    study_id
                                    study {
                                        id
                                        title_i18n { de }
                                    }
                                    profession_id
                                    profession {
                                        id
                                        title_i18n { de }
                                    }
                                    desc
                                    year
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.commit('addQualification', response.data.data.qualificationCreate);
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  qualificationDelete(context, payload) {

    let query = `mutation {
                                qualificationDelete(
                                    id:${payload}
                                ) {
                                    id
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.dispatch('readUserMe');
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  // vacancies
  // add vacancies one by one, as based on the process it doesn't make sense to CREATE them via nested mutation
  vacancyCreate(context, payload) {

    let query = `mutation {
                                vacancyCreate(
                                    user_id:${context.state.userData.id}
                                    company_id:${context.state.userData.company_id}
                                    title: "${payload.title}"
                                    workplace: "${payload.workplace}"
                                    vacancytype_id: ${payload.vacancytype_id ? payload.vacancytype_id : null}
                                    qualificationtype_id: ${payload.qualificationtype.id ? payload.qualificationtype.id : null}
                                    profession_id: ${payload.profession_id ? payload.profession_id : null}
                                    study_id: ${payload.study_id ? payload.study_id : null}
                                    ${payload.date_from ? 'date_from: "' + payload.date_from + '"' : 'date_from: null'}
                                    ${payload.date_to ? 'date_to: "' + payload.date_to + '"' : 'date_to: null'}
                                    desc: """${payload.desc}"""
                                    tasks: """${payload.tasks}"""
                                    requirements: """${payload.requirements}"""
                                    company1: "${payload.company1}"
                                    company2: "${payload.company2}"
                                    contact: "${payload.contact}"
                                    street1: "${payload.street1 !== null ? payload.street1 : ''}"
                                    street2: "${payload.street2 !== null ? payload.street2 : ''}"
                                    zip: ${payload.zip ? payload.zip : null}
                                    city: "${payload.city}"
                                    email: "${payload.email}"
                                    workload_from: ${payload.workload_from}
                                    workload_to: ${payload.workload_to}
                                    limited: ${payload.limited}
                                    published: ${payload.published}

                                ) {
                                    id
                                }
                            }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (response.data) {
        //context.commit('addQualification', response.data.data.qualificationCreate);
        context.dispatch('readUserMe');
        return response.data.data.vacancyCreate
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }

    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  vacancyUpdate(context, payload) {


    let query = `mutation {
                                vacancyUpdate(
                                    id:${payload.id}
                                    user_id:${context.state.userData.id}
                                    company_id:${context.state.userData.company_id}
                                    title: "${payload.title ? payload.title : ''}"
                                    workplace: "${payload.workplace ? payload.workplace : ''}"
                                    vacancytype_id: ${payload.vacancytype_id ? payload.vacancytype_id : null}
                                    qualificationtype_id: ${payload.qualificationtype && payload.qualificationtype.id ? payload.qualificationtype.id : null}
                                    profession_id: ${payload.profession_id ? payload.profession_id : null}
                                    study_id: ${payload.study_id ? payload.study_id : null}
                                    ${payload.date_from ? 'date_from: "' + payload.date_from + '"' : 'date_from: null'}
                                    ${payload.date_to ? 'date_to: "' + payload.date_to + '"' : 'date_to: null'}
                                    desc: """${payload.desc ? payload.desc : ''}"""
                                    tasks: """${payload.tasks ? payload.tasks : ''}"""
                                    requirements: """${payload.requirements ? payload.requirements : ''}"""
                                    company1: "${payload.company1 ? payload.company1 : ''}"
                                    company2: "${payload.company2 ? payload.company2 : ''}"
                                    contact: "${payload.contact ? payload.contact : ''}"
                                    street1: "${payload.street1 !== null ? payload.street1 : ''}"
                                    street2: "${payload.street2 !== null ? payload.street2 : ''}"
                                    zip: ${payload.zip ? payload.zip : null}
                                    city: "${payload.city ? payload.city : ''}"
                                    email: "${payload.email ? payload.email : ''}"
                                    workload_from: ${payload.workload_from}
                                    workload_to: ${payload.workload_to}
                                    limited: ${payload.limited}
                                    published: ${payload.published}

                                ) {
                                    id
                                }
                            }
                `
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      //console.log(response)
      if (!response.data.errors) {
        context.dispatch('readUserMe');
        context.dispatch('reference/readVacancyDatas', null, {root: true});
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  vacancyPublish(context, payload) {


    let query = `mutation {
                                vacancyUpdate(
                                    id:${payload.id}
                                    published: ${payload.published}

                                ) {
                                    id
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.dispatch('readUserMe');
        context.dispatch('reference/readVacancyDatas', null, {root: true})
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at creating Availability');
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
  vacancyDelete(context, payload) {

    let query = `mutation {
                                vacancyDelete(
                                    id:${payload}
                                ) {
                                    id
                                }
                            }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.dispatch('readUserMe');
        context.commit('setSnackbarMessage', 'Eintrag wurde erfolgreich gelöscht', {root: true});
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at deleting Availability');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },


  /**
   * File Upload to Laravel Backend
   * @returns {Promise}
   */
  fileUpload(context, payload) {
    let filetype = context.rootState.reference.filetypes.find(item => item.code == payload.code)

    let fileData = {
      dossier_id: context.state.userData.dossier.id,
      filetype_id: filetype.id,
      filetype_code: filetype.code,
      fileable_id: payload.id,
      fileable_type: filetype.model,
      desc: payload.desc,
    }

    // create FormData Object
    let formData = new FormData()
    const operations = `{ "query": "mutation ($file: Upload!, $dossier_id: Int, $filetype_id: Int, $filetype_code: String, $fileable_id: Int, $fileable_type: String, $desc: String ) { upload(file: $file, dossier_id: $dossier_id, filetype_id: $filetype_id, filetype_code: $filetype_code, fileable_id: $fileable_id, fileable_type: $fileable_type, desc: $desc) }", "variables": { "file": null, "dossier_id": ${fileData.dossier_id}, "filetype_id": ${fileData.filetype_id}, "filetype_code": "${fileData.filetype_code}", "fileable_id": ${fileData.fileable_id}, "fileable_type": "${fileData.fileable_type}", "desc": "${fileData.desc}" } }`
    formData.append('operations', operations)
    const map = `{"0": ["variables.file"]}`
    formData.append('map', map)

    // Attach the Upload File
    formData.append('0', context.state.currentUpload.file)


    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: formData,
    }).then(response => {
      //console.log(response)
      context.dispatch('readUserMe')
      context.commit('cloneCurrentUpload')
    }).catch(err => {
      console.log(err)
    });
  },
  //DOSSIER
  fileDelete(context, payload) {

    let query = `mutation {
                        deleteFile( id:${payload} )
                     }`
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      context.commit('setSnackbarMessage', {msg: 'Die Datei wurde erfolgreich gelöscht.', color: 'secondary'}, {root: true});
      context.dispatch('readUserMe');
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },

  // Helpers


  // check if email exists and is not the mail uf the current user
  checkIfEmailExists(context, payload) {
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: `{ checkEmail(email: "${payload}")
                  {
                    check
                  }
                }`,
      },
    }).then(response => {
      if (response.data && response.data.data.checkEmail && response.data.data.checkEmail.check)  {
        return true
      } else {
        return false
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },

  resendEmailVerification(context) {
    let query = `{
                        resendEmailVerification
                    }
                `
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      return response
    });
  },

  // Hinweis: darf nachher nur noch durch das Backend selber vorgenommen werden => sicher? wieso?
  orderAbo(context, payload) {

    //let enddate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    let enddate = new Date(new Date().setDate(new Date().getDate() + payload.duration)).toISOString().split('T')[0]

    let query = `mutation {
                        companyUpdate(
                            id: ${context.state.userData.company_id}
                                abo_id: ${payload.id}
                                abo_enddate: "${enddate}"
                        )
                        {
                            id
                        }
                    }`
    //console.log(query)
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data.errors) {
        let message = 'Fehler beim Bestellen des Abos.'
        context.commit('setSnackbarMessage', {msg: message, color: 'error'}, {root: true});
      } else if (response.data) {
        let message = 'Abo wurde erfolgreich aktualisiert.'
        context.commit('setSnackbarMessage', {msg: message, color: 'secondary'}, {root: true});
        context.dispatch('readUserMe');
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at updating User');
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', {msg: err, color: 'error'}, {root: true});
      throw new Error(err);
    });
  },
}
