<template>
  <div class="detalhes-wrapper" v-html="detalhes[0] == undefined ? 'Ocorreu um erro ao carregar esta informação' : detalhes[0].resumo"></div>
</template>
<script>
export default {
  data() {
    return {
      detalhes: []
    }
  },
  async created() {
    let res = await this.http.get(`${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`);

    if (res.data.success) {
      this.detalhes = res.data.data;
    }
  },
};
</script>
<style>
</style>