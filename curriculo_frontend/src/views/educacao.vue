<template>
  <div>
    <h1>{{littleText}}</h1>
    <ul class="escolas-list">
      <li v-for="(escola, index) in escolas" v-bind:key="index">
        <h4>{{escola.nome_curso}}</h4>
        <span>{{escola.nome}}</span>
        <div>
          {{escola.data_inicio}} - {{escola.data_fim}}
        </div>
        <hr v-if="index < escolas.length -1" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      littleText: "AIIIIIII",
      escolas: [],
    };
  },
  async created() {
    let res = await fetch("http://localhost:5000/api/escola/");
    let data = await res.json();

    if (data.success) {
      this.escolas = data.data;
    }
  },
  methods: {},
};
</script>

<style>
ul.escolas-list {
  list-style: none;
}
</style>