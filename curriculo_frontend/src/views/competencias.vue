<template>
  <div class="competencias-wrapper">
    <div v-for="(comp, index) in competencias" v-bind:key="index">
      <div class="competencias-list">
        {{comp.name}} -
        <span
          v-for="(i, ind) in maxScore"
          v-bind:key="ind"
          class="circle"
          v-bind:class="{fill: comp.current >= i}"
        ></span>
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
    };
  },
  async created() {
    let res = await fetch("http://localhost:5000/api/competencias/");
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