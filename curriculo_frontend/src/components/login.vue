<template>
  <div class="col-md-6 actual-auth">
    <h2 class="text-center">Login</h2>
    <form class="login-form">
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
    }
};
</script>

<style lang="scss">
div.btns-div {
    margin: 10px 0px;
}
</style>