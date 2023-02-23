import axios from 'axios';
import {getField, updateField} from 'vuex-map-fields';

export const state = () => (
  {
    lang: 'de', // TODO: an eine Stelle setzen
    mainMenuDrawer: false,
    snackbarText: '',
    snackbarColor: 'error',
    snackbarStatus: false,

    middlewareAuthDone: false,
    middlewareLoaderDone: false,
    middlewareVacanciesDone: false,

    snackbar: {
      status: false,
      msg: '',
      color: ''
    }
  }
);
export const mutations = {
  updateField, // vuex-map-fields
  setSnackbarMessage(state,payload){
    state.snackbar.color = payload.color || 'error';
    state.snackbar.msg = payload.msg || payload
    state.snackbar.status = true
  },
  setMiddlewareAuthDone(state) {
    state.middlewareAuthDone = true
  },
  setMiddlewareLoaderDone(state) {
    state.middlewareLoaderDone = true
  },
  setMiddlewareVacanciesDone(state) {
    state.middlewareVacanciesDone = true
  }
}
export const getters = {
  getField, //vuex-map-fields
}
export const actions = {
}
