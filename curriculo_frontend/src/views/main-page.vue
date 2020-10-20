<template>
  <div>
    <Navbar />
    <div id="app" class="container-sm main-page-wrapper">
      <div class="row curriculo-header">
        <div class="col-sm-6 image-div">
          <img alt="My Face" src="../assets/mim.jpg" />
        </div>
        <div class="col-sm-6">
          <ul class="first-info">
            <!-- Nome -->
            <li><i class="fas fa-universal-access"></i>Álvaro Diogo Gomes Ferreira de Sousa Holstein</li>
            <hr />
            <!-- Contactos -->
            <li><i class="fas fa-mobile-alt"></i>{{detalhes['telemovel']}}</li>
            <li><i class="fas fa-at"></i>{{detalhes['email']}}</li>
            <li><i class="fas fa-home"></i>{{detalhes['morada']}}</li>

            <hr />
            <!-- Repositórios -->
            <li><i class="fab fa-github"></i><b><a :href="detalhes['github']" target="_blank">GitHub</a></b></li>
            <li><i class="fab fa-bitbucket"></i><b><a :href="detalhes['bitbucket']" target="_blank">Bitbucket</a></b></li>
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
              >{{ $t('exp_prof') }}</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'educacao' }"
              id="educacao"
              class="nav-link"
              >{{ $t('educacao') }}</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'competencias' }"
              id="competencias"
              class="nav-link"
              >{{ $t('competencias')}}</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'detalhes' }"
              id="detalhes"
              class="nav-link"
              >{{ $t('detalhes')}}</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'info_adicional' }"
              id="info_adicional"
              class="nav-link"
              >{{ $t('inf_ad')}}</router-link
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
    let res = await this.http.get(`${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`);

    if (res.data.success) {
      this.detalhes = res.data.data[0];
    }
  },
  computed: {},
};
</script>

<style lang="scss">
div.main-page-wrapper {
  margin-bottom: 30px;
} 
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

  li > i.fas, li > i.fab {
    margin-right: 5px;
  }
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
