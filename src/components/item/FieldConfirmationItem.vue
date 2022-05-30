<template>
  <div>
    <v-list-item>
      <v-list-item-avatar v-if="icon">
        <v-icon class="blue darken-1" dark>
          {{ icon }}
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="label"></v-list-item-title>
        <v-list-item-subtitle class="pre-wrap">
          <p v-if="value">
            {{ value }}
          </p>
          <span v-else> {{ label }} não informado(a) </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      required: false,
    },
    label: {
      type: String,
      default: "{label}",
      required: false,
    },
    value: {
      type: [String, Number],
      default: "",
      required: false,
    },
  },
};
</script>

<style scoped>
.pre-wrap {
  white-space: pre-wrap;
}
</style>