<template>
  <div class="detalhes-wrapper" v-html="detalhes[$store.getters.language].resumo"></div>
</template>
<script>
export default {
  data() {
    return {
      detalhes: {
        pt: "",
        en: ""
      },
    }
  },
  async created() {

    let res = await this.http.get(`${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`);

    if (res.data.success) {
      this.detalhes['pt'] = res.data.data[0];
      this.detalhes['en'] = res.data.data[1];
    }
  },
};
</script>
<style>
</style>