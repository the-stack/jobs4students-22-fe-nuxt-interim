export default function (context) {
  context.store.dispatch('reference/readReferenceDatas').then(() => {
    context.store.commit('setMiddlewareLoaderDone');
  })
}
