<template>
  <div class="info-wrapper" v-html="this.markdown">
  </div>
</template>
<script>
export default {
  data() {
    return {
      markdown: "",
    };
  },
  async created() {
    try {
      let res = await this.http.get(`${this.$store.getters.url}extra-info`);
      console.log(res)
      if(res.data.success) {
        this.markdown = this.markyIt.render(res.data.data);
      } 
    } catch (error) {
      console.log(error)
      this.markdown = "Ocorreu um erro ao carregar esta informação"
    }
  },
};
</script>
<style>
</style>