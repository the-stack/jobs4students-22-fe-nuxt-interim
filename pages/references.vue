<template>
  <v-container fluid class="pa-0">
    <v-sheet class="transparent">
      <v-container>
        <v-row dense class="my-4 my-sm-10 my-md-16" justify="space-between">
          <v-col cols="12" sm="6" md="5">
            <h1 class="text-h2">
              Wir lieben ehrliches Feedback
            </h1>
            <p>Ob Ferienjob, Praktikum oder Nebenjob, wir suchen für dich die passenden Studentenjobs. Absolventen und
              Young Professionals finden bei uns den passenden Job für den Berufseinstieg.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="negative">
      <v-container>
        <v-row class="mb-md-16 mb-6 mt-12">
          <v-col cols="12" md="6">
            <v-card class="d-flex fill-height flex-column">
              <v-card-text class="grow">
                Ich habe mittels jobs4students schon mehrere Einsätze absolviert. Ich machte durchwegs sehr gute
                Erfahrungen.
              </v-card-text>
              <v-card-actions>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        class="elevation-6"
                        :src="require('@/assets/img/referenzen/jessica_pfister.jpg')"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Jessica Pfister</v-list-item-title>
                      <v-list-item-subtitle>Trübbach</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="d-flex fill-height flex-column">
              <v-card-text class="grow">
                Das Praktikum im Personalrestaurant eines Liechtensteinischen Industrieunternehmens hat mir geholfen,
                nach der Matura einen spannenden Einblick in die Gastronomie zu bekommen. Das gesamte Küchenteam hat
                mich herzlich begrüßt und mir sehr schnell verantwortungsvolle Aufgaben übergeben. Zudem herrschte immer
                eine sehr heitere Stimmung, wodurch die Tage, wie im Flug, vergingen.
              </v-card-text>
              <v-card-actions justify-end>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        class="elevation-6"
                        :src="require('@/assets/img/referenzen/sophia_summer.jpg')"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Sophia Summer</v-list-item-title>
                      <v-list-item-subtitle>Frastanz</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="d-flex fill-height flex-column">
              <v-card-text class="grow">
                Diesen Sommer habe ich zum ersten Mal ein Ferialpraktikum in Liechtenstein absolviert. Die Arbeit war
                sehr einfach und abwechslungsreich. Am meisten begeisterte mich das positive Arbeitsklima, die
                Mitarbeiter sowie die hilfsbereiten und gut gelaunten Vorarbeiter. Die Aufteilung der Arbeitspausen (ca.
                alle 2 Stunden 10 Minuten bezahlte Pause), welche wir draußen im Freien verbringen konnten, sorgten
                dafür, dass die Zeit wie im Fluge verging. Der Ferialjob bei jobs4students war durch und durch eine
                positive Erfahrung und ich werde mich definitiv nächsten Sommer wieder bewerben!
              </v-card-text>
              <v-card-actions justify-end>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        class="elevation-6"
                        :src="require('@/assets/img/referenzen/saskia_eisele.jpg')"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Saskia Eisele</v-list-item-title>
                      <v-list-item-subtitle>Feldkirch, Gesundheits- und Leistungssport</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="d-flex fill-height flex-column">
              <v-card-text class="grow">
                Das Praktikum bei jobs4students war sehr aufschlussreich. Ich konnte in diesen vier Wochen in die
                Arbeitswelt hinein schnuppern und habe viele Arbeiten erledigen dürfen, welche mich auch in meiner
                Ausbildung weitergebracht hat. Alles in Allem war es eine lehrreiche und spannende Zeit mit netten
                Arbeitskollegen und wichtigen Erfahrungen.
              </v-card-text>
              <v-card-actions justify-end>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        class="elevation-6"
                        :src="require('@/assets/img/referenzen/evita_hoedl.jpg')"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Evita Hödl</v-list-item-title>
                      <v-list-item-subtitle>Nenzing, Bautechnik</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-5 mb-md-16" justify="center">
          <v-col cols="auto">
            <h2 class="text-h2">Partner</h2>
          </v-col>
        </v-row>
        <v-row class="mb-10 mb-md-16" align="center" justify="center">
          <v-col cols="6" sm="3" align="center">
            <a href="https://careers.hilti.com/en/students-and-recent-graduates" target="_blank">
              <v-img contain
                     max-width="90%"
                     :src="require('@/assets/img/hilti_logo.png')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3" align="center">
            <a href="https://www.swarovskigroup.com/S/careers/WorkAtSwarovski.de.html" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/swarovski_black_219px.png')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3" align="center">
            <a href="https://innovatis.net" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/logo_innovatis_interimag.svg')"></v-img>
            </a>
          </v-col>
          <v-col cols="6" sm="3" align="center">
            <a href="https://the-stack.dev" target="_blank">
              <v-img contain
                     width="90%"
                     :src="require('@/assets/img/theStack_logo_coding-black.svg')"></v-img>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>

export default {
  name: 'references',
  head() {
    return {
      title: "Referenzen"
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
}
</script>

