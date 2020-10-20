<template>
  <div id="app" class="">
    <router-link :to="{ name: 'experiencia' }"></router-link>
    <router-link :to="{ name: 'auth' }"></router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  data() {
    return {};
  },
  created() {
    /** Veirificar Linguagem */
    if(localStorage['language']) {
      this.$store.commit("changeLanguage", localStorage['language'])
    }
  },
  computed: {},
};
</script>

<style lang="scss">
/** Não parece que isto esteja a fazer realmente alguma coisa 
o que foi preciso foi ir buscar o bootstrap-vue no main.js */
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";


</style>
