<template>
  <div class="col-12 actual-auth">
    <h2 class="text-center">Register</h2>
    <form class="register-form" v-on:submit="registerUser($event)">
      <label for="username-register">Username</label>
      <input
        v-model="username"
        type="text"
        id="username-register"
        class="form-control"
        required
      />

      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" class="form-control" required />

      <label for="empresa">Empresa</label>
      <input type="text" id="empresa" class="form-control" v-model="empresa" />

      <label for="password">Password</label>
      <input
        v-model="password"
        type="text"
        id="password"
        class="form-control"
      />

      <label for="password-recheck">ReCheck Password</label>
      <input
        v-model="passwordRecheck"
        type="text"
        id="password-recheck"
        class="form-control"
        required
      />

      <div class="text-center btns-div">
        <button type="submit" class="btn btn-success">
          Registar
        </button>
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
      empresa: "",
      password: "",
      passwordRecheck: "",
    };
  },
  methods: {
    async registerUser(eve) {
      eve.preventDefault();
      /** Registar um user com o post e está na altura e instalar o axios  */
      let errorMsg = null;
      let successRegister = false;
      if ((this.password != "" && this.passwordRecheck != "") && (this.password == this.passwordRecheck)) {
        successRegister = true;
        let res = await this.http.post(`${this.$store.getters.url}auth/register`, {
          username: this.username,
          password: this.password,
          empresa: this.empresa,
          email: this.email
        });

        if (res.data.success) {
          this.$store.commit("setToken", res.data.token);
          await this.$store.commit("login");

          this.$router.push({ name: "experiencia" });
        } else {
          successRegister = false;
          errorMsg = "Ocorreu um erro no Backends. Um momentinho !";
        }
      } else {
        errorMsg = "As passwords não são iguais!";
        successRegister = false;
        /** Podia meter para aqui uma cena para meter os inputs a vermelho */
      }

      if (!successRegister) {
        this.$Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMsg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
  computed: {},
  created() {},
};
</script>

<style lang="scss">
</style>