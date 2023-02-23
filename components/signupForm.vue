<template>
  <v-container class="ma-0 pa-0">

    <v-card class="mt-n16 text--font" color="negative">

      <v-card-title>
        <h3 class="text-h3 text-md-h2">Account erstellen</h3>
      </v-card-title>

      <v-card-text v-if="role==2 && !emailVerify">
        <p>Kostenlos einen <strong>Unternehmer-Account</strong> erstellen und mit der Veröffentlichung von Stellen beginnen.</p>
      </v-card-text>

      <v-card-text v-if="role==1 && !emailVerify">
        <p>Kostenlos einen <strong>Studenten-Account</strong> erstellen und mit der Suche nach Stellen beginnen.</p>
      </v-card-text>

      <v-card-text v-if="emailVerify">
        <p>
          Wir haben soeben ein Verifizierungsmail an die angegebene Mail Adresse gesendet.
          Um Profile einreichen zu können <strong>muss die E-Mail Adresse bestätigt werden.</strong>
        </p>
        <p>Du kannst dich aber trotzdem bereits anmelden und mit dem Ausfüllen deines Profils beginnen.</p>
      </v-card-text>

      <login-form v-if="emailVerify"></login-form>

      <v-card-text v-if="!emailVerify">
        <v-row>
          <v-col>
            <v-autocomplete v-model="salutation"
                            :items="genders"
                            :item-text="'title_i18n.' + lang"
                            item-value="id"
                            color="accent"
                            :value-comparator="valueComparator"
            >
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.salutation') }}</span>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname"
                          dense
                          color="accent">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.firstname') }}</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="lastname"
                          dense
                          color="accent">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.lastname') }}</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="role==2">
          <v-col cols="12" md="12">
            <v-text-field v-model="company"
                          dense
                          :rules="[rules.required]"
                          color="accent">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.company') }}</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="email"
                          dense
                          :error="emailCheck"
                          color="accent"
                          @blur="checkEmail(email)">
              <template v-slot:label>
                <span class="text--accent" v-html="$tc('user.mail')"></span>
              </template>
            </v-text-field>
            <span v-if="emailCheck" class="body-2">Diese Mail Adresse ist bereits in Verwendung.</span>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="password"
                          dense
                          type="password"
                          color="accent">
              <template v-slot:label>
                <span class="text--accent">{{ $tc('user.password') }}</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-checkbox v-model="agb"
                        color="accent"
                        class="mt-0">
              <template v-slot:label>
                        <span class="text--font body-1">
                          Ich bin mit den
                          <v-dialog
                            v-model="agbDialog"
                            :width="isMdAndDown? '75%':'50%'"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="pa-0 text-none text-decoration-underline body-1"
                                     plain
                                     color="accent" v-bind="attrs"
                                     v-on="on">Anmeldebedingungen</v-btn>
                            </template>
                            <v-card>
                              <v-card-title
                                class="text-h4 ">Nutzungs- und Datenschutzbestimmungen jobs4students</v-card-title>
                              <v-card-text class="text--font">
                                <p>Diese Richtlinien regeln die Erfassung-, Speicherung und Weitergabe von Personendaten auf, sowie die Nutzungsbestimmungen unserer Webapplikation auf den Websites www.jobs4students.ch / www.jobs4students.li</p>
                              <p>Die Benutzer unserer Website werden darüber informiert, dass durch die Nutzung von jobs4students Personendaten über ein öffentliches Netz transportiert werden. Es kann vorkommen, dass jobs4students Daten ausserhalb der Schweiz abspeichert und nutzt, wobei die datenschutzrechtlichen Bestimmungen der Schweiz immer eingehalten werden.</p>
                              <p>Es kann nicht garantiert werden, dass Personendaten bei jeder Übertragung zwischen jobs4students und den Benutzern vor Angriffen geschützt sind, da keine verschlüsselte Datenübertragung stattfindet. jobs4students ergreift jedoch die möglichen und vertretbaren Massnahmen zum Schutz von Personendaten und hält sich an die Bestimmungen des eidgenössischen Datenschutzgesetzes.</p>
                              <p>jobs4students empfiehlt dringendst, stets die aktuellsten Browser-Versionen zu nutzen und aktualisierte Virenprogramme zu verwenden. Innerhalb der jobs4students-Applikation werden die Personendaten geschützt übermittelt und gespeichert, es werden angemessene Massnahmen zur Verhinderung von Zugriffen unbefugter Dritter zu verhindern.</p>
                              <p>Wir nutzen die uns zur Verfügung gestellten Daten zur Erbringung unserer Personaldienstleistungen (Personalvermittlung, Personalverleih). Wir können vertrauliche und personenbezogene Daten über den Nutzer erfassen und verarbeiten, soweit diese Daten für die Erbringung unserer Personaldienstleistungen zweckdienlich sind. Wir stellen die Bewerberprofile (Name, Foto, Ausbildungsdaten, Wohnort, Einsatzwunschdaten) registrierten Partnerunternehmen (Kunden) zur Verfügung. Diese Partnerunternehmen unterliegen denselben Datenschutzrichtlinien wie wir. Mit der Registration bei jobs4students erklärt sich der Nutzer ausdrücklich mit der Weitergabe der Bewerberprofile an unsere registrierten Einsatzbetriebe einverstanden. Die Nutzer von jobs4students haben das Recht, dass wir ihnen kostenlos eine Kopie ihrer personenbezogenen, auf unserer Applikation gespeicherten Daten zur Verfügung stellen. Die Berichtigung von Personendaten können die Nutzer von jobs4students selbst durch entsprechende Mutationen mittels Bewerberlogin durchführen. Die Nutzer können uns mit der Löschung ihres Profils beauftragen, was wir ohne Kostenfolge ausführen. Die Aufbewahrungspflichten als Arbeitgeber nach Schweizerischem und Liechtensteinischem Recht bleiben vorbehalten.</p>

                              <p>
                                <strong>jobs4students powered by Innovatis Interim AG</strong><br>
                                Grünaustrasse 8, 9470 Buchs SG<br>
                                Telefon: +41 81 300 14 55
                              </p>
                              </v-card-text>
                              <v-card-actions>
                                <v-row>
                                  <v-spacer></v-spacer>
                                  <v-col cols="auto">
                                    <v-btn plain color="accent" @click="agbDialog = false"
                                           class="text-none">Schliessen</v-btn>
                                  </v-col>
                                </v-row>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          einverstanden
                        </span>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions v-if="!emailVerify">
        <v-btn block
               large
               color="primary"
               :disabled="signupDisabled"
               @click="startSignup"
               class="text-none font-weight-bold text--font"
        >Anmelden
        </v-btn>
      </v-card-actions>



    </v-card>


  </v-container>
</template>

<script>
import {mapFields} from 'vuex-map-fields'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'companies',
  data() {
    return {
      rules: {
        required: value => !!value || 'Pflichtfeld.',
      },
      emailCheck: false,
      emailVerify: false,
      agbDialog: false,
    }
  },
  props: [
    'role',
  ],
  computed: {
    ...mapState({
      genders: state => state.reference.genders,
      lang: state => state.lang,
    }),
    ...mapFields({
      salutation: 'me.userData.gender_id',
      firstname: 'me.userData.firstname',
      lastname: 'me.userData.lastname',
      company: 'me.userData.company.name',
      email: 'me.userData.email',
      password: 'me.userData.password',
      role_id: 'me.userData.role_id',
      company_id: 'me.userData.company_id',
      agb: 'me.userData.tc',
    }),
    signupDisabled() {
      return !this.firstname || !this.lastname || (!this.company && this.role==2) || !this.email || !this.password || !this.agb
    },
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
    isSmAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    isMdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  },
  methods: {
    ...mapActions({
      checkIfEmailExists: 'me/checkIfEmailExists',
      register: 'auth/register',
      userUpdate: 'me/userUpdate',
      companyCreate: 'me/companyCreate',
    }),
    valueComparator: (a, b) => Math.round(a) == Math.round(b),
    checkEmail(payload) {
      return this.checkIfEmailExists(payload).then(response => {
        this.emailCheck = response
      })
    },
    startSignup() {
      // company account?
      if (this.role == 2) {
        this.companyCreate().then((response) => {
          this.company_id = response.data.companyCreate.id
          this.register({role_id: this.role}).then(() => {
            this.emailVerify = true
            // Update User and go to profile view
            /*this.userUpdate().then(() => {
              this.emailVerify = true
            })*/
          })
        })
      } else {
        this.register({role_id: this.role}).then(() => {
          this.emailVerify = true
          // Update User and go to profile view
          /*this.userUpdate().then(() => {
            this.emailVerify = true
          })*/
        })
      }


    }
  },
  components: {

  }
}
</script>
