<template>
  <div>
    <Navbar />
    <div id="app" class="container-sm">
      <div class="row curriculo-header">
        <div class="col-sm-6 image-div">
          <img alt="My Face" src="../assets/mim.jpg" />
        </div>
        <div class="col-sm-6">
          <ul class="first-info">
            <!-- Nome -->
            <li>Álvaro Diogo Gomes Ferreira de Sousa Holstein</li>
            <hr />
            <!-- Contactos -->
            <li>{{detalhes['telemovel']}}</li>
            <li>{{detalhes['email']}}</li>
            <li>{{detalhes['morada']}}</li>

            <hr />
            <!-- Repositórios -->
            <li><a :href="detalhes['github']">GitHub </a></li>
            <li><a :href="detalhes['bitbucket']">Bitbucket </a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <!-- Em cada tab vai estar uma view -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              :to="{ name: 'experiencia' }"
              id="experiencia"
              class="nav-link"
              >Experiencia Profissional</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'educacao' }"
              id="educacao"
              class="nav-link"
              >Educação</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'competencias' }"
              id="competencias"
              class="nav-link"
              >Competencias</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'detalhes' }"
              id="detalhes"
              class="nav-link"
              >Detalhes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'info_adicional' }"
              id="info_adicional"
              class="nav-link"
              >Informação Adicional</router-link
            >
          </li>
        </ul>
      </div>
      <div>
        <router-view id="router-view"></router-view>
      </div>
      <Messaging />
    </div>
  </div>
</template>

<script>
import Messaging from "../components/messaging.vue";
import Navbar from "../components/navbar.vue";

export default {
  //   name: "App",
  components: {
    Messaging,
    Navbar,
  },
  data() {
    return {
      detalhes: {}
    };
  },
  async created() {
    let res = await this.http.get(`${this.$store.getters.url}infoextra`);

    if (res.data.success) {
      this.detalhes = res.data.data[0];
    }
  },
  computed: {},
};
</script>

<style lang="scss">
div.curriculo-header {
  margin-top: 20px;
}
div.image-div {
  text-align: center;

  > img {
    max-width: 100%;
    max-height: 250px;
    border-radius: 50%;
  }
}
ul.first-info {
  list-style: none;
  padding: 0px;
  margin-top: 10px;
}
hr.separator {
  border-top: 1px dashed red;
}

@media (min-width: 570px) {
  div.image-div {

    > img {
      max-height: 350px;
    }
  }
}
</style>
