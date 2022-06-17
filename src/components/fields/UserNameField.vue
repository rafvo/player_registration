<template>
  <div>
    <TextField
      :bind-value="bindValue"
      :label="label"
      :default-rules="defaultRules"
      :rules="rules"
      :required-label="requiredLabel"
      @input="emitInput"
    />
  </div>
</template>

<script>
import TextField from "./TextField.vue";

export default {
  components: { TextField },
  props: {
    bindValue: {
      type: [String, Number],
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "Nome de Usuário",
      required: false,
    },
    defaultRules: {
      type: String,
      default: "invalid_user_names",
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
  methods: {
    emitInput(payload) {
      this.$emit("input", payload);
    },
  },
};
</script>

<style scoped>
</style>