<template>
  <div>
    <ValidationProvider
      :vid="providerVid"
      v-slot="{ errors }"
      :name="label"
      :rules="allRules"
    >
      <v-text-field
        v-model="Field"
        :value="bindValue"
        :append-icon="appendIcon"
        :label="label"
        :type="type"
        :error-messages="errors"
        :placeholder="placeholder"
        :id="uniqueKey"
        :name="uniqueNameKey"
        filled
        @click:append="emitClickAppend"
      >
        <template v-slot:label>
          <FieldLabel :label="label" :required="requiredLabel" />
        </template>
      </v-text-field>
    </ValidationProvider>
  </div>
</template>

<script>
import FieldLabel from "@/components/label/FieldLabel";

export default {
  components: {
    FieldLabel,
  },
  props: {
    appendIcon: {
      type: String,
      default: "",
      required: false,
    },
    bindValue: {
      type: [String, Number],
      default: null,
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "{Label}",
      required: false,
    },
    defaultRules: {
      type: String,
      default: "",
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
    type: {
      type: String,
      default: "text",
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
      field: null,
    };
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(payload) {
        this.field = payload;
        this.emitInput();
      },
    },
    uniqueKey() {
      return this.id ? `${this.id}` : `${this._uid}`;
    },
    uniqueNameKey() {
      return this.name ? `${this.name}` : `${this._uid}`;
    },
    providerVid() {
      return this.vid ? `${this.vid}` : this.uniqueKey.concat("_provider_vid");
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
  methods: {
    emitClickAppend(event) {
      this.$emit("click:append", event);
    },
    emitInput() {
      this.$emit("input", this.field);
    },
  },
};
</script>

<style>
</style>