<template>
  <section>
    <div id="git-info">

    </div>
    <div class="info-wrapper" v-html="this.markdown"></div>
  </section>
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
      let res = await this.http.get(
        `${this.$store.getters.url}extra-info${this.$store.getters.contaValueParams}`
      );
      if (res.data.success) {
        this.markdown = this.markyIt.render(res.data.data);
      }
    } catch (error) {
      this.markdown = "Ocorreu um erro ao carregar esta informação";
    }
  },
  async updated() {
    let res = await this.http({
      method: "GET",
      url: "http://localhost:8787/ga/repos"
    })

    console.log(res)
 }
};
</script>
<style>
</style>