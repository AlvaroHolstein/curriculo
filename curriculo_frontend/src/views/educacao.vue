<template>
  <div class="escolas-wrapper">

    <b-card
      no-body
      v-for="(escola, index) in escolas"
      v-bind:key="index"
      class="overflow-hidden outter-card"
    >
      <b-row>
        <b-col md="12">
          <b-card-body v-bind:title="escola.nome_curso">
              <h5>{{escola.nome}}</h5>
              <b-card-text class="datas">
                <span class="data-inicio">{{escola.data_inicio}}</span>
                até
                <span class="data-fim">{{escola.data_inicio}}</span>
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
      escolas: []
    };
  },
  async created() {
    let res = await fetch(`${this.$store.getters.url}escola`);
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