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
      <ValidationProvider v-slot="{ errors }" :name="label" :rules="allRules">
        <v-text-field
          v-model="dateFormatted"
          :value="formatDate(bindValue)"
          :error-messages="errors"
          readonly
          v-bind="attrs"
          v-on="on"
          filled
          clearable
        >
          <template v-slot:label>
            <FieldLabel :label="label" :required="requiredLabel" />
          </template>
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker
      v-model="date"
      :active-picker.sync="activePicker"
      :max="max"
      :min="min"
      locale="pt"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import Vue from "vue";
import FieldLabel from "@/components/label/FieldLabel";

export default {
  components: {
    FieldLabel,
  },
  props: {
    bindValue: {
      default: null,
      required: false,
    },
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
    defaultRules: {
      type: String,
      default: "",
      required: false,
    },
    rules: {
      type: String,
      default: "",
      required: false,
    },
    requiredLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      date: null,
      dateFormatted: null,
      menu: false,
      activePicker: null,
    };
  },
  computed: {
    max() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    /*validation rules*/
    listRules() {
      return [this.defaultRules, this.rules];
    },
    cleanListRules() {
      const results = this.listRules.filter((element) => {
        return element !== "";
      });

      return results;
    },
    allRules() {
      return this.cleanListRules.join("|");
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    bindValue() {
      this.dateFormatted = this.formatDate(this.bindValue);
      this.date = this.parseDate(this.dateFormatted);
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.emitInput();
    },
    formatDate(date) {
      return Vue.filter("us_to_br_date")(date);
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    emitInput() {
      this.$emit("input", this.date);
    },
  },
};
</script>

<style>
</style>