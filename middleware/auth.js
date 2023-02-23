export default function (context) {

  let login = function () {
    // Tokens in Local Storage and not logged in yet?
    if (localStorage.getItem('j4s-jwt-a') && localStorage.getItem('j4s-jwt-r') && !context.store.state.middlewareAuthDone) {

      let tokens = {
        access_token: localStorage.getItem('j4s-jwt-a'),
        refresh_token: localStorage.getItem('j4s-jwt-r')
      };
      context.store.commit('auth/setTokens', tokens);
      // Read User if Access Token is available
      return context.store.dispatch('me/readUserMe').then(() => {
        context.store.commit('setMiddlewareAuthDone');
        context.store.commit('auth/setIsLoggedIn', true);
      })
      // No Tokens in Local Storage?
    } else if (!localStorage.getItem('j4s-jwt-a') || !localStorage.getItem('j4s-jwt-r')) {
      context.store.commit('me/cloneUserData')
      return new Promise((resolve) => {
        resolve();
      });
      // Tokens in Local Storage and logged in?
    } else {
      return new Promise((resolve) => {
        resolve();
      });
    }
  }

  let load = async function () {
    try {
      await login();
      //console.log(context.store.state.auth.isLoggedIn)
      if (!context.store.state.auth.isLoggedIn && (context.route.path==='/profile-company' || context.route.path==='/profile-student')) {
        context.app.router.push('/login')
      }
    } catch (e) {
      console.log(e)
    }
  };
  load();
}
