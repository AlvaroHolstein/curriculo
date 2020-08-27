<template>
  <div id="app" class="container-sm">
    <div class="row curriculo-header">
      <div class="col-sm image-div">
        <img alt="My Face" src="./assets/logo.png" />
      </div>
      <div class="col-sm">
        <ul class="first-info">
          <li>Álvaro Diogo Gomes Ferreira de Sousa Holstein</li>
        </ul>
      </div>
    </div>
    <!-- Só pa bere <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="row">
      <!-- Em cada tab vai estar uma view -->

      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link :to="{name:'experiencia'}" id="experiencia" class="nav-link">
            Experiencia Profissional
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'educacao'}" id="educacao" class="nav-link">
            Educação
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link">Competencias</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Detalhes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Informação Adicional</a>
        </li>
      </ul>
    </div>
    <div>
      <router-view id="router-view"></router-view>
    </div>
  </div>
</template>

<script>
// Só pa bere import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    // HelloWorld
  },
};
</script>

<style>
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
}
ul.first-info {
  list-style: none;
  margin-top: 10px;
}
</style>
