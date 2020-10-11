<template>
  <div class="competencias-wrapper">
    <div v-for="(comp, index) in competencias" v-bind:key="index">
      <div class="competencias-list row">
        <div class="col-3">{{comp.name}}</div>
        <div class="col-8"><span
          v-for="(i, ind) in maxScore"
          v-bind:key="ind"
          class="circle"
          v-bind:class="{fill: comp.current >= i}"
        ></span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      competencias: [],
      maxScore: 5,
      url:
        process.env.NODE_ENV == "production"
          ? "https://alvarocurriculo.herokuapp.com/api/"
          : "http://localhost:5000/api/",
    };
  },
  async created() {
    let res = await fetch(`${this.url}competencias`);
    let data = await res.json();

    if (data.success) {
      this.competencias = data.data;
    }
  },
};
</script>

<style scoped>
/** Ainda não tenho scss nesta sheet */
div.competencias-list {
  margin-top: 10px;
}
span.circle {
  height: 15px;
  width: 15px;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  display: inline-block;
}
span.circle.fill {
  background-color: black !important;
}
</style>