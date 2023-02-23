<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-icon="mdi-calendar"
        readonly
        hide-details
        color="info"
        v-bind="attrs"
        v-on="on"
      >
        <template v-slot:label>
          <span class="text--accent" v-html="label"></span>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      v-bind="$attrs"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name:'J4sDatePicker',
  data() {
    return {
      menu: false
    }
  },
  computed: {
    date: {
      get() {
        return this.dateValue
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  model:{
    prop:'dateValue'
  },
  props:[
    'dateValue',
    'label',
    'minDate',
    'maxDate'
  ]
}
</script>
