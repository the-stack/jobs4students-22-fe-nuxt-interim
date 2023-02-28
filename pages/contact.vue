<template>
  <v-sheet class="transparent fill-height">
    <v-container class="bg page-contact" fluid>
      <v-container>
        <v-row dense class="my-0 my-md-16 mx-0 mx-md-4">
          <v-col cols="12" sm="6">
            <v-card class="pa-5 mt-0 mt-md-16" color="#31417b6E">
              <h1 class="text-h2 text-md-h2 text--fontPrimary">
                jobs4students <br>powered by <br>Innovatis Interim AG
              </h1>
              <p>
                jobs4students powered by<br>
                Innovatis Interim AG<br>
                <br>
                +41 081 300 14 40<br>
                <a href="mailto:interim@innovatis.net" class="text--primary">interim@innovatis.net</a>
              </p>

              <p>
                <strong>Liechtenstein:</strong><br>
                Rietstrasse 7, 9496 Balzers
              </p>
              <p>
                <strong>Schweiz:</strong><br>
                Grünaustrasse 8, 9470 Buchs
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-sheet>
</template>

<script>


export default {
  name: 'contact',
  head(){
    return {
      title:'Kontakt'
    }
  },
  data() {
    return {

    }
  },
}
</script>
