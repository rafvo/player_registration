<template>
  <div class="row">
    <div :class="passwordGridClass">
      <TextField
        :append-icon="appendIcon"
        :bind-value="bindValue"
        :id="id"
        :label="label"
        :name="name"
        :placeholder="placeholder"
        :rules="allRules"
        :type="type"
        :vid="passwordVid"
        :required-label="requiredLabel"
        @input="emitInput"
        @click:append="showPassword = !showPassword"
      />
    </div>

    <div :class="confirmationGridClass">
      <slot name="confirm">
        <template v-if="withConfirmation">
          <TextField
            :append-icon="appendIcon"
            :label="confirmationLabel"
            :placeholder="confirmationPlaceholder"
            :required="required"
            :rules="allRules"
            :type="type"
            :vid="confirmationVid"
            :required-label="requiredLabel"
            @click:append="showPassword = !showPassword"
          />
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
import TextField from "./TextField.vue";
export default {
  components: { TextField },
  props: {
    confirmationLabel: {
      type: String,
      default: "Confirmar Senha",
      required: false,
    },
    confirmationPlaceholder: {
      type: String,
      default: "",
      required: false,
    },
    bindValue: {
      type: [Number, String],
      default: "",
      required: false,
    },
    defaultRules: {
      type: String,
      default: "min:6|password1",
      required: false,
    },
    defaultShowPassword: {
      type: Boolean,
      default: false,
      required: false,
    },
    fieldReadonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    grid: {
      type: [String, Number],
      default: 12,
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    iconShowPassword: {
      type: String,
      default: "mdi-eye",
      required: false,
    },
    iconHidePassword: {
      type: String,
      default: "mdi-eye-off",
      required: false,
    },
    label: {
      type: String,
      default: "Senha",
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    placeholder: {
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
    withConfirmation: {
      type: Boolean,
      default: false,
      required: false,
    },
    inlineField: {
      type: Boolean,
      default: false,
      required: false,
    },
    vid: {
      type: String,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      showPassword: false,
    };
  },
  computed: {
    type() {
      return this.showPassword ? "text" : "password";
    },
    appendIcon() {
      return this.showPassword ? this.iconHidePassword : this.iconShowPassword;
    },
    uniqueKey() {
      return `${this._uid}`;
    },
    passwordVid() {
      return this.vid ? `${this.vid}` : this.uniqueKey.concat("_vid");
    },
    confirmationVid() {
      return this.uniqueKey.concat("_confirmation_vid");
    },
    maxGrid() {
      return 12;
    },
    passwordGrid() {
      return this.grid <= this.maxGrid ? this.grid : this.maxGrid;
    },
    confirmationGrid() {
      return this.passwordGrid < this.maxGrid
        ? this.maxGrid - this.passwordGrid
        : this.maxGrid;
    },
    passwordGridClass() {
      return `col-md-${this.passwordGrid}`;
    },
    confirmationGridClass() {
      return `col-md-${this.confirmationGrid}`;
    },
    /*validation rules*/
    confirmedRule() {
      return `confirmed:${this.confirmationVid}`;
    },
    listRules() {
      return [this.defaultRules, this.confirmedRule, this.rules];
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
    defaultShowPassword() {
      this.showPassword = this.defaultShowPassword;
    },
  },
  methods: {
    emitInput(payload) {
      this.$emit("input", payload);
    },
  },
  created() {
    this.showPassword = this.defaultShowPassword;
  },
};
</script>

<style scoped>
</style>