export default function (context) {
  context.store.dispatch('reference/readVacancyDatas').then(() => {
    context.store.commit('setMiddlewareVacanciesDone');
  })
}
