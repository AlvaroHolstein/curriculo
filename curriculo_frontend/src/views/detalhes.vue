<template>
  <section>
    <div class="git-wrapper" v-show="this.lastUpdatedRepo && this.allRepos">
      <div class="last-updated-repo">
        <h5>Last Updated Repo</h5>
        <p>Nome: {{ this.lastUpdatedRepo.name }}</p>
        <p v-if="this.lastUpdatedRepo.description">
          Description:
          {{ this.lastUpdatedRepo.description }}
        </p>
      </div>
      <div class="all-public-repos row">
        <!-- Devia meter aqui um gráfico -->
        <div class="col-md-12">
          <!-- <div id="chart"></div> -->
          <canvas id="chart" width="400" height="400"></canvas>
        </div>
      </div>
      <hr />
    </div>
    <div
      v-show="Object.keys(this.lastUpdatedRepo).length && !this.allRepos"
      class="text-center spinner-wrapper"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      class="detalhes-wrapper"
      v-html="detalhes[$store.getters.language]"
    ></div>
  </section>
</template>
<script>
// import bb, { bar } from "billboard.js";
import chartjs from "chart.js";

export default {
  data() {
    return {
      detalhes: {
        pt: "",
        en: "",
      },
      lastUpdatedRepo: {},
      allRepos: null,
    };
  },
  async created() {
    // Get the latest Repo
    this.http({
      method: "GET",
      url: `${this.$store.getters.serverless_url}ga/latest`,
    })
      .then((res) => {
        let response = res.data;
        if (response.success) {
          this.lastUpdatedRepo = response.data;
        } else {
          throw new this.CustomError(
            "Ocorreu um erro ao carregar o ultimo Repo",
            null
          );
        }
      })
      .catch((err) => {
        console.warn(err.msg || "err");
      });

    // Get All Repos commits
    this.http({
      method: "GET",
      url: `${this.$store.getters.serverless_url}ga/commits`,
    })
      .then((res) => {
        let response = res.data;
        if (response.success) {
          this.allRepos = response.data;

          // Create Columns
          /*
        // Obj Model
          {
            id,
            name,
            description,
            totalCommits
          }

        // Chart structure for each Repo
        Labels: [repo_name, ....]
        datastes: [
          
        ]
          [
            ["repo_name1", number_of_commits]
            ["repo_name2", number_of_commits]
          ]
        */

          let labels = [];
          let datasets = [];
          let myCommits = [];
          let colors = [];
          for (let repo of this.allRepos) {
            // columns.push([repo.name, repo.commits]);
            labels.push(repo.name);
            datasets.push(repo.commits);
            myCommits.push(repo.myCommits);
            let newColor = this.colorGenerator();
            while (colors.indexOf(newColor) == -1) {
              colors.push(newColor);
            }
          }

          let canvas = document.querySelector("#chart");
          /*const chart =*/ new chartjs(canvas, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Total # of Commits",
                  data: datasets,
                  backgroundColor: colors,
                  // borderColor: ["red", "green", "blue"],
                  borderWidth: 1.5,
                },
                {
                  label: "My # of Commits",
                  data: myCommits,
                  backgroundColor: colors,
                  // borderColor: ["red", "green", "blue"],
                  borderWidth: 0.75,
                },
              ],
            },
            options: {
              legend: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
              onClick: (ev, activeElementsArr) => {
                if (activeElementsArr.length > 0) {
                  console.log(ev, activeElementsArr[0]._model);
                  let clickedRepo = this.allRepos.find((repo) => {
                    if (repo.name == activeElementsArr[0]._model.label)
                      return true;
                  });

                  if (clickedRepo) {
                    console.log(clickedRepo);
                    window.open(clickedRepo.html_url, "_blank");
                  }
                }
              },
            },
          });
        } else {
          throw new this.CustomError(
            "Erro ao ir buscar todos os public Repos!",
            null
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });

    let res = await this.http.get(
      `${this.$store.getters.url}infoextra${this.$store.getters.contaValueParams}`
    );

    if (res.data.success) {
      let ptaux = res.data.data[0].resumo.split("Idade:");
      let ptWithIdade = "";

      for (let i = 0; i < ptaux.length; i++) {
        if (i == 0)
          ptWithIdade = ptaux[i] + "Idade: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["pt"] = ptWithIdade;

      let ingaux = res.data.data[1].resumo.split("Age:");
      let ingWithAge = "";

      for (let i = 0; i < ingaux.length; i++) {
        if (i == 0)
          ingWithAge = ingaux[i] + "Age: " + this.calculate_age(4, 24, 1997);
      }
      this.detalhes["en"] = ingWithAge;
    }
  },
  async updated() {},
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
    colorGenerator() {
      let colorSchema = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += colorSchema[Math.floor(Math.random() * 17)] || "F";
      }

      return color;
    },
  },
};
</script>

<style lang="scss">
div.spinner-wrapper {
  > div {
    margin: 20px 0px;
  }
}
</style>