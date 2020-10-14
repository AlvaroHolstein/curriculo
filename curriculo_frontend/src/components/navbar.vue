<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{$store.getters.username == null ? Curriculo : $store.getters.username}}</a>

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

    <div class="collapse navbar-collapse row" id="navbarSupportedContent">
      <div class="form-container col-10">
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
      </div>

      <div class="col-2 mr-right">
        <ul class="navbar-nav navbar-list">
          <li class="nav-item active logout-btn" v-on:click="logout()">
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
      logout() {
          this.$store.commit("logout");
          this.$router.push({name: 'auth'});
      }
  }
};
</script>

<style lang="scss" scoped>
ul.navbar-list {
  right: 5px;

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
/** Podia ter aqui uma lista com os vários tamanhos das colunas do bootstrap */
</style>