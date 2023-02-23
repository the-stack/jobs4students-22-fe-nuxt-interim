<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container>
        <v-row dense class="my-4 my-sm-10 my-md-16" justify="space-between">
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-h1">{{ $tc('nav.pages.signup') }}</v-card-title>
              <v-card-text>
                <profile-profile class="mt-10" location="signup"></profile-profile>
              </v-card-text>
              <v-card-actions>
                <v-row class="pa-4">
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn v-if="!user_id" x-large block color="primary" class="text--font font-weight-black" @click="signup">
                      Account erstellen
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>

import {mapState, mapActions} from 'vuex'
import profileProfile from "@/components/profileProfile";

export default {
  name: 'signup',
  head() {
    return {
      title: 'Anmelden'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      genders: state => state.genders,
      lang: state => state.lang,
      user_id: state => state.me.userData.id,
      userData: state => state.me.userData,
      file: state => state.me.currentUpload.file,
    }),
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      userCreate: 'me/userCreate',
      dossierCreate: 'me/dossierCreate',
      userUpdate: 'me/userUpdate',
      fileUpload: 'me/fileUpload',
    }),
    signup() {
      this.userData.role_id = 1
      this.register({role_id: 1}).then(() => {
        // update user with existing data
        // Upload picture if available
        if (this.file) {  this.fileUpload({ code: 'profilepictures', desc: '', id: this.userData.dossier.id }); }

        // Update User and go to profile view
        this.userUpdate().then(() => {
          this.$router.push({path:'/profile-student'});
        })


      })
    }
  },
  components:{
    profileProfile
  }

}
</script>
