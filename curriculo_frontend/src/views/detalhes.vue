<template>
    <div class="detalhes-wrapper">
        {{detalhes[0] == undefined ? "" : detalhes[0].resumo}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            detalhes: []
        }
    },
    async created() {
        let res = await fetch("http://localhost:5000/api/infoextra")
        let data = await res.json();

        if(data.success) { 
            this.detalhes = data.data;
        }
    }
}
</script>
<style>

</style>