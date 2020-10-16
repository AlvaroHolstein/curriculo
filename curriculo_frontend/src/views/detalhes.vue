<template>
  <div class="detalhes-wrapper" v-html="detalhes[0] == undefined ? 'Ocorreu um erro ao carregar esta informação' : detalhes[0].resumo"></div>
</template>
<script>
export default {
  data() {
    return {
      detalhes: [],
      url:
        process.env.NODE_ENV == "production"
          ? "https://alvarocurriculo.herokuapp.com/api/"
          : "http://localhost:5000/api/",
    };
  },
  async created() {
    let res = await fetch(`${this.url}infoextra`);
    let data = await res.json();

    if (data.success) {
      this.detalhes = data.data;
    }
  },
};
</script>
<style>
</style>