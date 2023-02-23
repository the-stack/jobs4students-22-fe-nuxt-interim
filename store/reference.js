import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';

export const state = () => (
  {
    lang: 'de', // TODO: an eine Stelle setzen

    snackbar: {
      status: false,
      msg: '',
      color: 'secondary'
    },


    referenceDataLoaded: false,
    vacancyDataLoaded: false,

    // Reference Data
    abos: [],
    countries: [],
    filetypes: [],
    genders: [],
    industries: [],
    vacancytypes: [],
    languageLevels: [],
    languages: [],
    maritals: [],
    permits: [],
    professions: [],
    qualificationtypes: [],
    roles: [],
    skills: [],
    statuses: [],
    studies: [],
    uploadTypes: [],

    vacancies: [],

    // blueprints
    vacancyBlueprint: {
      id: null,
      user_id: null,
      title: '',
      desc: '',
      workplace: '',
      tasks: '',
      requirements: '',
      company1: '',
      company2: '',
      contact: '',
      street1: '',
      street2: '',
      zip: '',
      city: '',
      email: '',
      workload_from: null,
      workload_to: null,
      limited: false,
      published: false,
      vacancytype_id: null,
      qualificationtype_id: null,
      qualificationtype: {
        id: null,
        title_i18n: {
          de: '',
        },
        is_study: null,
        is_profession: null,
      },
      study_id: null,
      profession_id: null,
      date_from: '',
      date_to: '',
      profilepicture: null,
    },
  }
);
export const mutations = {
  updateField, // vuex-map-fields
  setSnackbarMessage(state, payload) {
    state.snackbar.status = true;
    state.snackbar.msg = payload;
    if (payload.color){
      state.snackbar.msg = payload.msg;
      state.snackbar.color = payload.color;
    }
  },
  setReferenceDatas (state, payload) {
    state.abos = payload.abos
    state.countries = payload.countries
    state.filetypes = payload.filetypes
    state.genders = payload.genders
    state.industries = payload.industries
    state.vacancytypes = payload.vacancytypes
    state.languageLevels = payload.languagelevels
    state.languages = payload.languages
    state.maritals = payload.maritals
    state.permits = payload.permits
    state.professions = payload.professions
    state.qualificationtypes = payload.qualificationtypes
    state.roles = payload.roles
    state.skills = payload.skills
    state.statuses = payload.statuses
    state.studies = payload.studies
  },
  setVacancyDatas (state, payload) {
    state.vacancies = payload
  }

}
export const getters = {
  getField, //vuex-map-fields
}
export const actions = {
  readReferenceDatas(context) {
    //console.log('getting reference data')
    let query = `{
                            abos
                            {
                              id
                              vacancies_active_max
                              price_month
                              price_month_chf
                              price_year
                              price_year_chf
                              title_i18n {
                                  ${context.state.lang}
                              }
                            }
                            countries
                            {
                              id
                              code
                              title_i18n {
                                  ${context.state.lang}
                              }
                            }
                            filetypes
                            {
                              id
                              code
                              model
                              title_i18n {
                                  ${context.state.lang}
                              }
                            }
                            genders
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            industries
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            vacancytypes
                              {
                                id
                                code
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            languagelevels
                              {
                                id
                                code
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            languages
                              {
                                id
                                code
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            maritals
                              {
                                id
                                code
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            permits
                              {
                                id
                                code
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            professions
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            qualificationtypes
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                                is_study
                                is_profession
                              }
                            roles
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            statuses
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                            studies
                              {
                                id
                                title_i18n {
                                    ${context.state.lang}
                                }
                              }
                }`
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
        context.commit('setReferenceDatas', response.data.data)
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at loading referenceDatas');
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  readVacancyDatas(context) {
    let filter = ''
    if (context.rootState.me.vacancyFilter.vacancytypes.length>0) {
      filter = 'vacancytype_id: [' + context.rootState.me.vacancyFilter.vacancytypes + '] '
    }
    if (context.rootState.me.vacancyFilter.qualificationtypes.length>0) {
      filter = filter + 'qualificationtype_id: [' + context.rootState.me.vacancyFilter.qualificationtypes + ']'
    }

    let query = `{
                            vacancies_active_published
                            ${filter ? '(' + filter + ')': ''}
                              {
                                id
                                overview
                                user_id
                                company_id
                                title
                                workplace
                                workload_from
                                workload_to
                                date_from
                                date_to
                                qualificationtype {
                                  id
                                  title_i18n {
                                    de
                                  }
                                }
                                vacancytype {
                                  id
                                  title_i18n {
                                    de
                                  }
                                }
                                created_at
                              }
                  }`
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        context.commit('setVacancyDatas', response.data.data.vacancies_active_published)
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at loading Vacancies');
      }
      return response
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
  getVacancy(context, payload) {
    let query = `{
                            vacancy (id:  ${payload})
                              {
                                id
                                user_id
                                company_id
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
                                vacancytype {
                                  id
                                  title_i18n {
                                    de
                                  }
                                }
                                profilepicture {
                                    id
                                    filetype_id
                                    publicurl
                                    storageurl
                                    created_at
                                    updated_at
                                }
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
                                created_at
                                updated_at
                              }
                  }`
    return axios({
      url: process.env.NUXT_ENV_LARAVEL_GRAPHQL,
      method: 'post',
      headers: context.rootGetters['auth/getTokenHeader'],
      data: {
        query: query,
      },
    }).then(response => {
      if (response.data) {
        return response.data.data
      } else {
        console.dir({errors: response.data.errors});
        throw new Error('at loading Vacancy');
      }
    }).catch(err => {
      context.commit('setSnackbarMessage', err, {root: true});
      throw new Error(err);
    });
  },
}
