<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        filled
        clearable
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :active-picker.sync="activePicker"
      :max="max"
      :min="min"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Data de Nascimento",
      required: false,
    },
    min: {
      type: String,
      default: "1950-01-01",
      required: false,
    },
  },
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  computed: {
    max() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.emitInput();
    },
    emitInput() {
      this.$emit("input", this.date);
    },
  },
};
</script>

<style>
</style>