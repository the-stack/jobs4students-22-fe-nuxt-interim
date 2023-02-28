<template>
  <v-container>
    <v-card flat class="mt-5" color="disabled">
      <v-card-text v-if="!companytext">
        Die Mail-Adresse wurde erfolgreich verifiziert - du kannst dich nun mit deinem Konto einloggen.
      </v-card-text>
      <v-card-actions>
        <v-btn
          x-large
          tile
          color="secondary"
          class="pl-4 pr-2"
          to="/login"
          block
        >
          <span class="body-1 font-weight-bold">Zum Login</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="companytext" class="mt-5 text-center" flat color="disabled">
      <v-card-text class="h4 secondary--text">
        Mail-Adresse erfolgreich verifiziert. Account wird überprüft.
      </v-card-text>
      <v-card-actions class="d-flex justify-center text-center">
        <v-btn large tile color="secondary" class="pl-4 pr-2" to="/">
          <span class="body-1 font-weight-bold">Zum Login</span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'EmailverifyView',
  head(){
    return {
      title:'EmailVerify'
    }
  },
  components: {},
  data() {
    return {
      companytext: false
    }
  },
  methods:{
    ...mapActions({
      emailVerify: 'auth/emailVerify',
    }),
  },
  mounted: function () {
    this.emailVerify(this.$route.query.token).then(response => {

    })
  }

}
</script>
