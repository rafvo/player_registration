<template>
  <main class="wrapper">
    <v-app>
      <v-main class="mx-5">
        <PlayerForm />
      </v-main>
    </v-app>
  </main>
</template>

<script>
import PlayerForm from "@/components/forms/PlayerForm.vue";

export default {
  name: "App",
  components: {
    PlayerForm,
  },
  data: () => ({}),
};
</script>

<style>
#app {
  background: #fafafa;
}
</style>