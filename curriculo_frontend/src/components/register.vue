<template>
  <div class="col-md-6 actual-auth">
    <h2 class="text-center">Register</h2>
    <form class="register-form" v-on:submit="registerUser()">
      <label for="username-register">Username</label>
      <input v-model="username" type="text" id="username-register" class="form-control" />

      <label for="email">Email</label>
      <input v-model="email" type="text" id="email" class="form-control" />

      <label for="password">Password</label>
      <input v-model="password" type="text" id="password" class="form-control"  />

      <label for="password-recheck">ReCheck Password</label>
      <input v-model="passwordRecheck" type="text" id="password-recheck" class="form-control"/>

      <div class="text-center btns-div">
          <button type="submit" class="btn btn-success">Registar Oh maninho</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            passwordRecheck: ""
        }
    },
    methods: {
        async registerUser() {
            /** Registar um user com o post e está na altura e instalar o axios  */
            let res = this.http.post('http://localhost:5000/api/auth/register', {username: this.username, password: this.password});
            console.log(res);
        }
    },
    computed: {

    },
    created() {
        
    }
};
</script>

<style lang="scss">
</style>