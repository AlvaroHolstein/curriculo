<template>
  <div class="experiencia-wrapper">
    <div class="trabalhos" v-for="(trabalho, index) in filterTrabalhos" v-bind:key="index">
      <h4>{{trabalho.cargo}}</h4>
      <h6>{{trabalho.empresa}}</h6>
      <p>{{trabalho.data_inicio}} - {{trabalho.data_fim}}</p>
      <div class="resumo" v-if="trabalho.resumo != ''">
        {{trabalho.resumo}}
      </div>
      <hr v-if="index < trabalhos.length-1">
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      trabalhos: [],
      url: process.env.NODE_ENV == "production" ? "https://alvarocurriculo.herokuapp.com/api/" : "http://localhost:5000/api/"
    };
  },
  async created() {
    let res = await fetch(`${this.url}exp`);
    let data = await res.json();

    if (data.success) {
      this.trabalhos = data.data;
    }
  },
  computed: {
    filterTrabalhos() {
      let trbs = this.trabalhos;
      let trabs = trbs.sort((trab1, trab2) => {
        return new Date(trab1.data_inicio).getTime() - new Date(trab2.data_inicio).getTime();
      })
      return trabs;
    },
  },
};
</script>

<style scoped>
div.experiencia-wrapper {
  margin-top: 15px;
}
div.resumo {
  font-size: 12px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>