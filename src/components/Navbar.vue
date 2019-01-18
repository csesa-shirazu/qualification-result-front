<template>
    <div id="nav" class="ui large inverted pointing menu fixed secondary" style="border-bottom: 0px;">

        <div class="ui container contentnav">
            <div class="right item" dir="rtl">
                <div v-if="loading">
                    Loading
                </div>
                <select v-else class="ui fluid search dropdown rtl">
                    <option value="" active>جستجوی گریدر</option>
                    <option v-for="grader in apidata.graders" :value="grader.id">
                        {{grader.first_name + ' ' + grader.last_name }}
                    </option>
                </select>

            </div>

        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                apidata : [
                ],
                loading: true,
            };
        },
        methods: {
            getData: function(){
                let vinst = this;
                axios.get(this.$store.state.hostUrl + '/api/v1/courses-data/')
                  .then(function (response) {

                    vinst.loading = false;
                    $(document).ready(function(){
                        $('.ui.dropdown').dropdown();
                    })

                    vinst.apidata = response.data;

                  })
                  .catch(function (error) {

                    console.log(error);

                  })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style scoped>
#nav {
    /* Style for "Rectangle" */
    width: 100%;
    height: 60px;
    border: 1px solid #979797;
    background-color: #1d1e1f;
    text-align: right;
}
#nav .ui.dropdown{
    min-width: 400px;
}
.rtl {
    flex-direction: row-reverse;
    text-align: right;
    direction: rtl;
}
.ui.dropdown.rtl .menu>.item {
    text-align: right;
}
.ui.dropdown input.search,
.ui.dropdown.rtl .text{
    text-align: right;
}
.ui.dropdown.rtl .ui.label,
.ui.dropdown.rtl .default.text,
.ui.dropdown.rtl input.search,
.ui.dropdown.rtl .text{
    float: right;
    right: 0px;
}
</style>