<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{
      $store.getters.username == null ? Curriculo : $store.getters.username
    }}</a>

    <!-- Burguer Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Ficava fixe, como se fosse pesquisar por documentação 
    Usar algolia pra esta magia-->
    <div
      class="collapse navbar-collapse text-right navbar-menu"
      id="navbarSupportedContent"
    >
      <!--<div class="form-container col-10">
        <form class="form-de-pesquisa">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div> -->

      <ul class="navbar-nav navbar-list">
        <!-- Bandeiras -->
        <li class="pt-flag" v-on:click="changeLanguage('pt')">
          <img
            v-bind:class="{
              selected_lang: $store.getters.language == 'pt' ? true : false,
            }"
            v-bind:src="getImgUrl('portugal-flag-icon-32.png')"
            alt="Portuguese flag"
          />
        </li>

        <li class="en-flag" v-on:click="changeLanguage('en')">
          <img
            v-bind:class="{
              selected_lang: $store.getters.language == 'en' ? true : false,
            }"
            v-bind:src="getImgUrl('united-kingdom-flag-icon-32.png')"
            alt="English Flag"
          />
        </li>

        <!-- Logout -->
        <li class="nav-item active logout-btn" v-on:click="logout()">
          <span>Logout</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "auth" });
    },
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + pet);
    },
    changeLanguage(lang) {
      // Chamar a store
      //só para não haver "repetidos"
      if (this.$store.getters.language != lang) {
        this.$store.commit("changeLanguage", lang);
      }
    },
  },
};
</script>

<style lang="scss">
// Ver esta merda melhor
div.navbar-menu.collapse {
  &.show li.en-flag {
    margin-right: 0px;
  }
  li.en-flag {
    margin-right: 20px;
  }
}

ul.navbar-list {
  li {
    cursor: pointer;
  }

  li.pt-flag,
  li.en-flag {
    .selected_lang {
      border: 0.5px solid black;
      box-shadow: 0 6px 10px 0 #666;
    }

    &:hover {
      // transform: scale(1.5,1.5);
    }
  }

  li.logout-btn {
    width: 100%;
    text-align: right;

    &:hover {
      color: red;
    }
  }
}

div.form-container {
  width: auto;
  text-align: center;

  form.form-de-pesquisa {
    > input {
      max-width: 50%;
      margin: 0px !important;
      display: inline-block;
    }
  }
}

@media (min-width: 990px) {
  ul.navbar-list {
    right: 10px;
    position: absolute;
  }
}
/** Podia ter aqui uma lista com os vários tamanhos das colunas do bootstrap */
</style>