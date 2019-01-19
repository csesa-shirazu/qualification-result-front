<template>
    
    <div id="nav" class="ui large inverted pointing menu secondary" style="border-bottom: 0px;">
        <div v-if="loading" class="ui active inverted dimmer">
                <div class="ui text loader">Loading</div>
        </div>
        <div v-else class="right item" dir="rtl" style="padding: 0px;">
            <select class="ui fluid search dropdown rtl">
                <option value="" active>جستجوی گریدر</option>
                <option v-for="grader in apidata.graders" :value="grader.id">
                    {{grader.first_name + ' ' + grader.last_name }}
                </option>
            </select>
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
            chooseGrader: function(val){
                this.$store.dispatch('setGrader', val)
            },
            getData: function(){
                let vinst = this;
                axios.get(this.$store.state.hostUrl + '/api/v1/courses-data/')
                  .then(function (response) {

                    vinst.loading = false;
                    vinst.apidata = response.data;

                    $(document).ready(function(){
                        $('.ui.dropdown').dropdown({
                            onChange: function(val) {
                                vinst.chooseGrader(Number(val));
                            }
                        });
                        $('#nav div.ui.dropdown input').focus(function(){
                            $('#nav div.ui.dropdown').
                                animate({'opacity': 0.95}, 100);
                        })
                        $('#nav div.ui.dropdown input').blur(function(){
                            $('#nav div.ui.dropdown').
                                animate({'opacity': 0.5}, 100);
                        })
                    })

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

<style>
#nav {
    width: 100%;
    height: 60px;
    border: 1px solid #979797;
    background-color: #1d1e1f;
    text-align: right;
}
#nav div.ui.dropdown {
    border: 1px solid white;
    border-radius: 10px;
    opacity: 0.5;
}

#nav .ui.dropdown{
    min-width: 400px;
}
#nav .rtl {
    flex-direction: row-reverse;
    text-align: right;
    direction: rtl;
}
#nav .ui.dropdown.rtl .menu>.item {
    text-align: right;
}
#nav .ui.dropdown input.search,
#nav .ui.dropdown.rtl .text{
    text-align: right;
}
#nav .ui.dropdown.rtl .ui.label,
#nav .ui.dropdown.rtl .default.text,
#nav .ui.dropdown.rtl input.search,
#nav .ui.dropdown.rtl .text{
    float: right;
    right: 0px;
}
</style>