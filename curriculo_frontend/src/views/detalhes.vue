<template>
  <section>
    <div class="git-wrapper" v-if="this.lastUpdatedRepo && this.allRepos">
      <div class="last-updated-repo">
        <h5>Last Updated Repo</h5>
        <p>Nome: {{ this.lastUpdatedRepo.name }}</p>
        <p v-if="this.lastUpdatedRepo.description">
          Description:
          {{ this.lastUpdatedRepo.description }}
        </p>
      </div>
      <div class="all-public-repos">
        <!-- Devia meter aqui um gráfico -->
        <div id="chart"></div>
      </div>
      <hr />
    </div>
    <div v-else class="text-center spinner-wrapper">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      class="detalhes-wrapper"
      v-html="detalhes[$store.getters.language]"
    ></div>
  </section>
</template>
<script>
// import bb, { ba } from "billboard.js";

export default {
  data() {
    return {
      detalhes: {
        pt: "",
        en: "",
      },
      lastUpdatedRepo: null,
      allRepos: null,
    };
  },
  async created() {

    // Get the latest Repo
    this.http({
      method: "GET",
      url: `${this.$store.getters.serverless_url}ga/latest`,
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        if (response.success) {
          this.lastUpdatedRepo = response.data;
        } else {
          throw new this.CustomError(
            "Ocorreu um erro ao carregar o ultimo Repo",
            null
          );
        }
      })
      .catch((err) => {
        console.warn(err.msg || 'err');
      });

    // Get All Repos commits
    this.http({
      method: "GET",
      url: `${this.$store.getters.serverless_url}ga/commits`
    }).then((res) => {
      let response = res.data;
      if (response.success) {
        this.allRepos = response.data;
        console.log(this.allRepos)

        // Initiate Chart

      } else {
        throw new this.CustomError("Erro ao ir buscar todos os public Repos!", null)
      }
    }).catch((err) => {
      console.error(err.msg)
    })

    let res = await this.http.get(
      `${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`
    );

    if (res.data.success) {
      let ptaux = res.data.data[0].resumo.split("Idade:");
      let ptWithIdade = "";

      for (let i = 0; i < ptaux.length; i++) {
        if (i == 0)
          ptWithIdade = ptaux[i] + "Idade: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["pt"] = ptWithIdade;

      let ingaux = res.data.data[1].resumo.split("Age:");
      let ingWithAge = "";

      for (let i = 0; i < ingaux.length; i++) {
        if (i == 0)
          ingWithAge = ingaux[i] + "Age: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["en"] = ingWithAge;
    }
  },
  async updated() {},
  methods: {
    calculate_age(birth_month, birth_day, birth_year) {
      let today_date = new Date();
      let today_year = today_date.getFullYear();
      let today_month = today_date.getMonth();
      let today_day = today_date.getDate();
      let age = today_year - birth_year;

      if (today_month < birth_month - 1) {
        age--;
      }
      if (birth_month - 1 == today_month && today_day < birth_day) {
        age--;
      }
      return age;
    },
  },
};
</script>

<style lang="scss">
div.spinner-wrapper {
  > div {
    margin: 20px 0px;
  }
}
</style>