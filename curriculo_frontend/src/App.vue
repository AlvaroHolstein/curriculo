<template>
  <div id="app" class="container-sm">
    <router-link :to="{ name: 'experiencia' }"></router-link>
    <router-link :to="{ name: 'auth' }"></router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },

  data() {
    return {};
  },
  computed: {},
};
</script>

<style>
</style>
