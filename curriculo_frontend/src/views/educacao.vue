<template>
  <div class="escolas-wrapper">
    <ul class="escolas-list">
      <li v-for="(escola, index) in escolas" v-bind:key="index">
        <h4>{{escola.nome_curso}}</h4>
        <span>{{escola.nome}}</span>
        <div>
          {{escola.data_inicio}} - {{escola.data_fim}}
        </div>
        <hr v-if="index < escolas.length -1" class="separator" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      escolas: [],
      url: process.env.NODE_ENV == "production" ? "https://alvarocurriculo.herokuapp.com/api/" : "http://localhost:5000/api/"
    };
  },
  async created() {
    let res = await fetch(`${this.url}escola`);
    let data = await res.json();

    if (data.success) {
      this.escolas = data.data;
    }
  },
  methods: {},
};
</script>

<style scoped>
div.escolas-wrapper {
  margin-top: 20px;
}
ul.escolas-list {
  list-style: none;
  padding: 0px;
}
</style>