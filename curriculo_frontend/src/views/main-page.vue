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

            <!-- Contactos -->
            <li>{{detalhes['telemovel']}}</li>
            <li>{{detalhes['email']}}</li>
            <li>{{detalhes['morada']}}</li>


            <!-- Repositórios -->
            <li><a :href="detalhes['github']">GitHub </a></li>
            <li><a :href="detalhes['bitbucket']">Bitbucket </a></li>
          </ul>
        </div>
      </div>
      <!-- Só pa bere <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
// Só pa bere import HelloWorld from './components/HelloWorld.vue'
import Messaging from "../components/messaging.vue";
import Navbar from "../components/navbar.vue";
// A ma Gonna make the messaging madafakas
export default {
  //   name: "App",
  components: {
    Messaging,
    Navbar,
  },
  data() {
    // console.log(process.env.NODE_ENV, process.env)
    return {
      url: process.env.NODE_ENV == "production" ? "https://alvarocurriculo.herokuapp.com/api/" : "http://localhost:5000/api/",
      detalhes: null
    };
  },
  async created() {
    let res = await this.http.get(`${this.url}infoextra`);

    if (res.data.success) {
      this.detalhes = res.data.data[0];
      console.log(this.detalhes);
    }
  },
  computed: {},
};
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
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
