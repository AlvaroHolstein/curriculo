<template>
  <div class="col-12 actual-auth">
    <h2 class="text-center">Login</h2>
    <form class="login-form" v-on:submit="login($event)">
      <label for="login-part1">Email/Username</label>
      <input
        v-model="loginPart1"
        type="text"
        id="login-part1"
        class="form-control"
      />

      <label for="password-login">Password</label>
      <input
        v-model="pass"
        type="password"
        id="password-login"
        class="form-control"
      />

      <div class="text-center btns-div">

        <button class="btn btn-outline-success" type="submit">
          <span class="spinner-border spinner-border-sm loading-login"></span>

          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginPart1: "",
      pass: "",
    };
  },
  created() {
    // this.http = Axios
  },
  methods: {
    async login(eve) {
      eve.preventDefault();
      this.showLoader();
      let auth = await this.http.post(
        `${this.$store.getters.url}auth/login`,
        {
          username: this.loginPart1,
          password: this.pass,
        } /*, {withCredentials: true}*/
      );

      /** Não vai ser assim em produção, mas em desenvolvimento vou usar esta maneira
       * Passo 1. das mensagens
       */
      if (auth.data.success) {
        this.$store.commit("setToken", auth.data.jwt);
        await this.$store.commit("login");
        this.hideLoader();

        /** Passo 2. das Mensagens */
        this.$router.push({ name: "experiencia" });
      } else {
        this.hideLoader();
        this.$Swal.fire(
          "There was something wrong with your credentials",
          "",
          "error"
        );
      }
    },
    showLoader() {
      let loadingDiv = document.querySelector("span.loading-login");
      if (loadingDiv) {
        loadingDiv.style.display = "inline-block";
      }
    },
    hideLoader() {
      let loadingDiv = document.querySelector("span.loading-login");
      if (loadingDiv) {
        loadingDiv.style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss">
div.btns-div {
  margin: 10px 0px;
}
span.loading-login {
  display: none;
}
</style>