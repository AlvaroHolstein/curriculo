<template>
  <div class="escolas-wrapper">
    <b-card
      no-body
      v-for="(escola, index) in escolasArr"
      v-bind:key="index"
      class="overflow-hidden outter-card"
    >
      <b-row v-if="escola">
        <b-col md="12">
          <b-card-body v-bind:title="escola.nome_curso">
            <h5>{{ escola.nome }}</h5>
            <b-card-text class="datas">
              <p>
                {{
                  escola.details == undefined
                    ? ""
                    : escola.details[$store.getters.language]
                }}
              </p>
              <span class="data-inicio">{{ escola.data_inicio }}</span>
              até
              <span class="data-fim">{{ escola.data_fim}}</span>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      escolas: [],
    };
  },
  async created() {
    let res = await this.http.get(
      `${this.$store.getters.url}escola${this.$store.getters.contaValueParams}`
    );

    if (res.data.success) {
      this.escolas = res.data.data.sort((ed1, ed2) => {
        return (
          new Date(ed2.data_inicio).getTime() -
          new Date(ed1.data_inicio).getTime()
        );
      });
    }
  },
  computed: {
    escolasArr() {
      let arr = [];
      let anadaOne = this.escolas;

      for (let i = 0; i < anadaOne.length; i++) {
        anadaOne[i]['details'] = {};
        let aux = {
            pt: anadaOne[i].detalhes == undefined ? "" : anadaOne[i].detalhes,
            en: anadaOne[i].detalhes_en == undefined ? "" : anadaOne[i].detalhes_en
        }
        anadaOne[i].details = aux;

        arr.push(anadaOne[i]);
      }
      return arr;
    },
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