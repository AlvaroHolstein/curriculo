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
    let res = await fetch(`${this.$store.getters.url}infoextra`);
    let data = await res.json();

    if (data.success) {
      this.detalhes = data.data;
    }
  },
};
</script>
<style>
</style>