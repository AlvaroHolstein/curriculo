<template>
  <div class="container-sm all-container">
    <div class="row main-container">
        <Login v-if="login"  />
        <Register v-if="!login" />
    </div>
    <div class="text-center log-reg-btn">
        <button class="btn btn-outline-dark" v-on:click="login = !login">{{login ? "Register" : "Login"}}</button>
    </div>
  </div>
</template>

<script>
import Login from "../components/login.vue";
import Register from "../components/register.vue";

export default {
  components: {
      Login, 
      Register
  },
  data() {
    return {
      login: true,
    };
  },
  created() {
    // console.log(this.$store.getters.logged);

    if(this.$store.getters.logged) {
      this.$router.push({name: 'experiencia'})
    }
  }
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
</style>