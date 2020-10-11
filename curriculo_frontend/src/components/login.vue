<template>
  <div class="col-md-6 actual-auth">
    <h2 class="text-center">Login</h2>
    <form class="login-form" v-on:submit="login($event)">
      <label for="login-part1">Email/Username</label>
      <input v-model="loginPart1" type="text" id="login-part1" class="form-control"/>

      <label for="password-login">Password</label>
      <input v-model="pass" type="text" id="password-login" class="form-control">

      <div class="text-center btns-div">
          <button class="btn btn-outline-success" type="submit">Fazer login oh mano</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            loginPart1: "",
            pass: ""
        }
    },
    created() {
        // this.http = Axios
    },
    methods: {
      async login(eve) {
        eve.preventDefault()
        let auth = await this.http.post("http://localhost:5000/api/auth/login", {username: this.loginPart1, password: this.pass}/*, {withCredentials: true}*/);
        console.log(auth.data);

        if(auth.data.success) {
          this.$store.commit('login');
          this.$store.commit('setToken', auth.data.jwt)
          this.$router.push({name: 'experiencia'})
        }
      }
    }
};
</script>

<style lang="scss">
div.btns-div {
    margin: 10px 0px;
}
</style>