<template>
  <div class="competencias-wrapper">
    <div v-for="(comp, index) in competencias" v-bind:key="index">
      <div class="competencias-list row">
        <div class="col-3">{{ comp.name }}</div>
        <div class="col-8">
          <span
            v-for="(i, ind) in maxScore"
            v-bind:key="ind"
            class="circle"
            v-bind:class="{ fill: comp.current >= i }"
          ></span>
        </div>
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
    console.log(this.$store.getters.headersValue);
    // https://github.com/axios/axios/issues/319#issuecomment-442915750
    let res = await this.http.get(`${this.$store.getters.url}competencias`, {
      headers: this.$store.getters.headersValue,
      credentials: "same-origin"
    });

    if (res.data.success) {
      this.competencias = res.data.data;
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