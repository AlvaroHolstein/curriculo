<template>
  <div>
    <Navbar />

    <div class="container-sm all-container">
      <div class="row main-container">
        <Login v-if="login" />
        <Register v-if="!login" />
      </div>
      <div class="the-languages text-center">
        <ul class="list-inline">
          <li
            class="pt-flag list-inline-item"
            v-on:click="changeLanguage('pt')"
          >
            <img
              v-bind:class="{
                selected_lang: $store.getters.language == 'pt' ? true : false,
              }"
              v-bind:src="getImgUrl('portugal-flag-icon-32.png')"
              alt="Portuguese flag"
            />
          </li>

          <li
            class="en-flag list-inline-item"
            v-on:click="changeLanguage('en')"
          >
            <img
              v-bind:class="{
                selected_lang: $store.getters.language == 'en' ? true : false,
              }"
              v-bind:src="getImgUrl('united-kingdom-flag-icon-32.png')"
              alt="English Flag"
            />
          </li>
        </ul>
      </div>
      <div class="text-center log-reg-btn">
        <button class="btn btn-outline-dark" v-on:click="login = !login">
          {{ login ? "Register" : "Login" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../components/login.vue";
import Register from "../components/register.vue";
import Navbar from "../components/navbar.vue";

export default {
  components: {
    Login,
    Register,
    Navbar,
  },
  data() {
    return {
      login: true,
    };
  },
  created() {
    if (this.$store.getters.logged) {
      this.$router.push({ name: "experiencia" });
    }
  },
  methods: {
    changeLanguage(lang) {
      // Chamar a store
      // só para não haver "repetidos"
      if (this.$store.getters.language != lang) {
        this.$store.commit("changeLanguage", lang);
      }
    },
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + pet);
    },
  },
};
</script>

<style lang="scss">
div.main-container {
  margin-top: 20px;
}
div.actual-auth {
  border: 1px solid black;
}
div.log-reg-btn {
  margin: 10px 0px;
}
li.pt-flag,
li.en-flag {
  .selected_lang {
    border: 0.5px solid black;
    box-shadow: 0 6px 10px 0 #666;
  }
}
</style>