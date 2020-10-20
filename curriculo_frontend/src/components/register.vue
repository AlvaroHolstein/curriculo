<template>
  <div class="col-12 actual-auth">
    <h2 class="text-center">Register</h2>
    <form class="register-form" v-on:submit="registerUser($event)">
      <label for="username-register">Username <span class="req">*</span></label>
      <input
        v-model="username"
        type="text"
        id="username-register"
        class="form-control"
        required
      />

      <label for="email">Email <span class="req">*</span></label>
      <input
        v-model="email"
        type="email"
        id="email"
        class="form-control"
        required
      />

      <label for="empresa">{{$t('empresa')}}</label>
      <input type="text" id="empresa" class="form-control" v-model="empresa" />

      <label for="tele">{{$t('telemovel')}} </label>
      <input type="text" id="tele" class="form-control" v-model="tele" />
      <label for="password">Password <span class="req">*</span></label>
      <input
        v-model="password"
        type="password"
        id="password"
        class="form-control"
      />

      <label for="password-recheck"
        >{{$t('recheck')}} Password <span class="req">*</span></label
      >
      <input
        v-model="passwordRecheck"
        type="password"
        id="password-recheck"
        class="form-control"
        required
      />

      <div class="text-center btns-div">
        <button type="submit" class="btn btn-success">
          <span
            class="spinner-border spinner-border-sm loading-register"
          ></span>

          Registar
        </button>
        <div class="required-container text-right">
          <span class="req">*</span><b>{{$t('required')}}</b>
        </div>
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
      tele: "",
      password: "",
      passwordRecheck: "",
    };
  },
  methods: {
    async registerUser(eve) {
      eve.preventDefault();
      /** Registar um user com o post e está na altura e instalar o axios  */
      this.showLoader();

      let errorMsg = null;
      let successRegister = false;
      if (
        this.password != "" &&
        this.passwordRecheck != "" &&
        this.password == this.passwordRecheck
      ) {
        successRegister = true;
        let res = await this.http.post(
          `${this.$store.getters.url}auth/register`,
          {
            username: this.username,
            password: this.password,
            empresa: this.empresa,
            telemovel: this.telemovel,
            email: this.email,
          }
        );

        if (res.data.success) {
          this.$store.commit("setToken", res.data.token);
          await this.$store.commit("login");

          this.hideLoader();

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
        this.hideLoader();
        this.$Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMsg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    showLoader() {
      let loadingDiv = document.querySelector("span.loading-register");
      if (loadingDiv) {
        loadingDiv.style.display = "inline-block";
      }
    },
    hideLoader() {
      let loadingDiv = document.querySelector("span.loading-register");
      if (loadingDiv) {
        loadingDiv.style.display = "none";
      }
    },
  },
  computed: {},
  created() {},
};
</script>

<style lang="scss">
span.loading-register {
  display: none;
}
span.req {
  color: red;
  font-weight: bold;
}
div.required-container {
  font-size: 11px;
}
</style>