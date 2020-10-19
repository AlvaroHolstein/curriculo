<template>
  <div class="experiencia-wrapper">
    <!-- <div
      class="trabalhos"
      v-for="(trabalho, index) in filterTrabalhos"
      v-bind:key="index"
    >
      <h4>{{ trabalho.cargo }}</h4>
      <h6>{{ trabalho.empresa }}</h6>
      <p>{{ trabalho.data_inicio }} - {{ trabalho.data_fim }}</p>
      <div class="resumo" v-if="trabalho.resumo != ''">
        {{ trabalho.resumo }}
      </div>
      <hr v-if="index < trabalhos.length - 1" />
    </div> -->
    <!-- <div> -->
      <b-card
        no-body
        v-for="(trabalho, index) in filterTrabalhos"
        v-bind:key="index"
        class="overflow-hidden outter-card"
      >
        <b-row no-gutters>
          <b-col md="6">
            <!-- para resolver esta merda https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working -->
            <b-card-img
              :src="getImgUrl(trabalho.img)"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body v-bind:title="trabalho.cargo">
              <h6>{{trabalho.empresa ? trabalho.empresa : ""}}</h6>
              <div v-for="(data, index2) of trabalho.datas" v-bind:key="index2"> 
                <b-card-text class="datas"
                  >
                  <span class="data-inicio">{{ data.data_inicio == undefined ? "little error": data.data_inicio.split("T")[0] }}</span>
                   até
                  <span class="data-fim">{{ data.data_fim == undefined ? "little error": data.data_fim.split("T")[0] }}</span>
                </b-card-text>
                <b-card-text class="resumo">
                  {{ data.resumo }}
                </b-card-text>
              </div>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      trabalhos: [],
    };
  },
  async created() {
    let res = await this.http.get(`${this.$store.getters.url}exp${this.$store.getters.contaValueParams}`);

    if (res.data.success) {
      this.trabalhos = res.data.data;
    }
  },
  computed: {
    filterTrabalhos() {
      let trbs = this.trabalhos;
      let trabs = trbs.sort((trab1, trab2) => {

        return (
          new Date(trab2.data_inicio).getTime() -
          new Date(trab1.data_inicio).getTime()
        );
      });

      let grouping = [];

      // Só vai ter os nomes dos identifiers
      // let doneIdentifiers = [];

      /** Aqui os trabaklhos já estão organizados por data */
      for (let trab1 of trabs) {
        let model = {
          empresa: "",
          cargo: "",
          datas: [
            // data_inicio,
            // data_fim,
            // resumo
          ],
          identifier: "",
          img: "",
        };

        if (
          grouping.findIndex((trab) => trab.identifier == trab1.identifier) ==
          -1
        ) {
          model.empresa = trab1.empresa;
          model.cargo = trab1.cargo;
          model.identifier = trab1.identifier;

          grouping.push(model);
          for (let trab2 of trabs) {
            if (trab1.identifier == trab2.identifier) {
              if (grouping.length > 0) {
                for (let i = 0; i < grouping.length; i++) {
                  if (grouping[i].identifier == trab2.identifier) {
                    grouping[i].datas.push({
                      data_inicio: trab2.data_inicio,
                      data_fim: trab2.data_fim,
                      resumo: trab2.resumo,
                      empresa: trab2.empresa
                    });
                    if (trab2.img != "") {
                      // grouping[i].img = `require('@/assets/${trab2.img}')`;
                      grouping[i].img = trab2.img;
                    }
                  }
                }
              }
              // else {
              //   model.datas.push({data_inicio: trab2.data_inicio, data_fim: trab2.data_fim, resumo: trab2.resumo})
              //   grouping.push(model);
              // }
            }
          }
        }
      }
      return grouping;
    },
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context("../assets/", false, /\.jpg$/);
      return images("./" + pet);
    },
  },
};
</script>

<style>
div.experiencia-wrapper {
  margin-top: 15px;
}
b-card.outter-card {
  max-width: 540px;
}
div.resumo {
  font-size: 12px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>