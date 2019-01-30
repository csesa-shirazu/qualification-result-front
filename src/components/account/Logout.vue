<template>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
        },
        created(){
            this.$store.commit('removeToken')
            this.$router.push({ name: 'courses'})
        }
    }
</script>

<style>
</style>