<template>
  <div>
    <!--
    immediate: {{immediate}}<br>
    filetype: {{filetype}}<br>
    profilepicture: {{profilepicture}}<br>
    fileableid: {{fileableid}}<br><br>
    currentUploadFile: {{currentUploadFile}}
    -->

    <v-card @drop.prevent="uploadFile"
            @dragenter.prevent
            @dragover.prevent
            flat
            v-if="!currentUploadFile && !profilepicture || !currentUploadFile && profilepicture && !profilepicture.id"
            @click="$refs.uploader.click()">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-icon class="bs-font-size-8x text--secondary">mdi-camera</v-icon>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row dense class="mb-4">
        <v-spacer></v-spacer>
        <v-col cols="auto" class="text-center text--accent">
          <p class="font-weight-bold ma-0">
            <span v-if="filetype==='companylogos'">Logo auswählen</span>
            <span v-else-if="filetype==='vacancylogos'">Logo/Bild auswählen</span>
            <span v-else>Profilbild auswählen</span>
          </p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <input ref="uploader"
             class="d-none"
             type="file"
             @input="selectFile">

    </v-card>

    <!-- Profilbild -->
    <v-card flat v-if="profilepicture && profilepicture.id">
      <v-row justify="center">
        <v-col cols="auto">
          <v-avatar size="200">
            <v-img :src="profilepicture.publicurl" width="100%"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row dense class="ma-4">
        <v-spacer></v-spacer>
        <v-chip close
                @click:close="fileDelete(profilepicture.id)"> löschen
        </v-chip>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>

    <!-- Stellenbild -->
    <v-card flat v-if="filetype==='vacancylogos' && currentUploadFile">
      <v-row justify="center">
        <v-col cols="auto">
          <v-avatar size="200">
            <v-img :src="currentUploadBase64" width="100%"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
      <v-row dense class="ma-4">
        <v-spacer></v-spacer>
        <v-chip close
                @click:close="cloneCurrentUpload()"> löschen
        </v-chip>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>


  </div>
</template>
<script>
import {mapFields} from 'vuex-map-fields';
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  name: 'dropzone',
  data() {
    return {};
  },
  computed: {
    ...mapState({

      // get current ID depending on type (company logo, profile pic etc)
      currentFileableId(state) {
        if (this.filetype === 'companylogos') {
          return state.me.userData.company.id
        } else if (this.filetype === 'profilepictures') {
          return state.me.userData.dossier.id
        } else if (this.filetype === 'vacancylogos') {
          return this.fileableid
        } else {
          return null
        }
      },

    }),
    ...mapFields({
      currentUpload: 'me.currentUpload',
      currentUploadFile: 'me.currentUpload.file',
      currentUploadBase64: 'me.currentUpload.base64',
    }),
  },
  methods: {
    ...mapActions({
      fileDelete: 'me/fileDelete',
      fileUpload: 'me/fileUpload',
    }),
    ...mapMutations({
      cloneCurrentUpload: 'me/cloneCurrentUpload',
    }),
    makeBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.currentUploadBase64 = reader.result;
      };
    },
    selectFile(e) {
      let dt = e.target.files[0];
      this.currentUploadFile = dt;
      this.makeBase64(dt)
      if (this.immediate === true) { this.fileUpload({ code: this.filetype, desc: '', id: this.currentFileableId }); }
    },
  },
  props: [
      'filetype',
      'immediate',
      'profilepicture',
      'fileableid'
  ]
};
</script>
<style lang="scss" scoped>
.bs-font-size-8x {
  font-size: $font-size-root * 8
}
</style>
