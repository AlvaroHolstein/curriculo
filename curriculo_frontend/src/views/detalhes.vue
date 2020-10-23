<template>
  <div
    class="detalhes-wrapper"
    v-html="detalhes[$store.getters.language]"
  ></div>
</template>
<script>
export default {
  data() {
    return {
      detalhes: {
        pt: "",
        en: "",
      },
    };
  },
  async created() {
    let res = await this.http.get(
      `${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`
    );

    if (res.data.success) {
      let ptaux = res.data.data[0].resumo.split("Idade:");
      let ptWithIdade = "";

      for (let i = 0; i < ptaux.length; i++) {
        if (i == 0) ptWithIdade = ptaux[i]+"Idade: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["pt"] = ptWithIdade;


      let ingaux = res.data.data[1].resumo.split("Age:");
      let ingWithAge = ""

      for (let i = 0; i < ingaux.length; i++) {
        if (i == 0) ingWithAge = ingaux[i]+"Age: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["en"] = ingWithAge;
    }
  },
  methods: {
    calculate_age(birth_month, birth_day, birth_year) {
      let today_date = new Date();
      let today_year = today_date.getFullYear();
      let today_month = today_date.getMonth();
      let today_day = today_date.getDate();
      let age = today_year - birth_year;

      if (today_month < birth_month - 1) {
        age--;
      }
      if (birth_month - 1 == today_month && today_day < birth_day) {
        age--;
      }
      return age;
    },
  },
};
</script>
<style>
</style>