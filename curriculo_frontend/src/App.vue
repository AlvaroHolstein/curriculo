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
          <router-link
            :to="{name:'experiencia'}"
            id="experiencia"
            class="nav-link"
          >Experiencia Profissional</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'educacao'}" id="educacao" class="nav-link">Educação</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'competencias'}" id="competencias" class="nav-link">Competencias</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'detalhes'}" id="detalhes" class="nav-link">Detalhes</router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{name:'info_adicional'}"
            id="info_adicional"
            class="nav-link"
          >Informação Adicional</router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view id="router-view"></router-view>
    </div>
    <div class="fab">
      <i class="fa fa-comments-o" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
// Só pa bere import HelloWorld from './components/HelloWorld.vue'

// A ma Gonna make the messaging madafakas
export default {
  name: "App",
  components: {
  },
  data() {
    console.log(process.env.NODE_ENV, process.env)
  },
  computed: {

  }
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
hr.separator {
  border-top: 1px dashed red;
}
div.fab {
  width: 60px;
  height: 60px;
  background-color: red;
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;

  font-size: 40px;
  color: white;
  text-align: center;
  line-height: 70px;

  position: fixed;
  right: 50px;
  bottom: 50px;
}
div.fab > i {
  right: 60px;
  bottom: 60px;
  position:fixed;
  z-index: 999;
}

div.fab:hover /*, div.fab > i:hover*/ {
  box-shadow: 0 6px 14px 0 #666;
  /* transform: scale(1.05); */
}
</style>
