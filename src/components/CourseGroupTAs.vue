<template>
  <div class="ui contaienr" id="ta-profile-container">
    <div v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>
    <div v-else>
      <div style="text-align: right; padding: 17px 60px 17px 0px;">
        another page
      </div>
      <div class="container" id="course-groups">
          
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { alignFooterMixin } from "../alignFooterMixin";
export default {
  data () {
    return {
      apidata : [
      ],
      loading: true,
    };
  },
  watch: {
    '$route': 'getCourseGroups'
  },
  mixins:[
      alignFooterMixin
  ],
  methods: {
    getCourseGroupTAs: function(){
      let vinst = this;
      vinst.loading = false;
      // axios.get(this.$store.state.hostUrl + '/api/v1/course-groups/')
      //   .then(function (response) {
      //     console.log(response.data)
      //     vinst.apidata = response.data;

      //     vinst.loading = false;

      //   })
      //   .catch(function (error) {

      //     console.log(error);

      //   })
    }
  },
  mounted(){
    this.getCourseGroupTAs();
  }
}
</script>

<style>
#ta-profile-container {
  padding: 10px 0px;
  margin: auto;
  margin-top: 60px;
  width: 90%;
  min-height: 100px;
  border-radius: 38px;
  background-image: linear-gradient(135deg, #49494a 0%, #232324 100%);
  font-size: 20px;
  font-weight: 100;
  direction: rtl;
}

#course-groups {
  margin: 0px auto 30px auto;
  width: 100%;
  text-align: right;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

#course-groups .course-groups-col{
    text-align: right;
    width: 330px;
    min-height: 200px;
    margin: auto;
    margin-top: 0px;
    background: transparent;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    align-self: flex-start;
    align-items: flex-start;
    align-content: flex-start;
}

#course-groups .course-groups-col-second{
    border-right: 1px solid #ffffff;
    border-left: 2px dashed #ffffff;
}

#course-groups .course-groups-col-third{
    text-align: center;
}

#course-groups .course-groups-col-second .course-groups-col-content{
  margin-bottom: 15px;
}

#course-groups .course-groups-col-third-content{
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  margin: auto;
}
#course-groups .course-groups-col-content{
  width: 100%;
  height: 100%;
  margin: 5px 0px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
}

#course-groups .course-groups-col-header{
  width: 220px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 35px;
  background-color: #4a4a4a;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
}

@media screen and (min-width: 734px){
  #course-groups .course-groups-col-second .course-groups-col-header {
    margin-top: -97px;
    margin-bottom: -97px;
  }
}

@media screen and (max-width: 733px){
  #course-groups .course-groups-col-second .course-groups-col-header {
    margin-top: 0px;
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 1100px){
  #course-groups .course-groups-col-third .course-groups-col-header {
    margin-top: -97px;
    margin-bottom: -97px;
  }
}

@media screen and (max-width: 1099px){
  #course-groups .course-groups-col-third .course-groups-col-header {
    margin-top: 50px;
    margin-bottom: 10px;
  }
}

#course-groups .course-title {
  text-align: center;
  font-size: 16px;
  color: #1d1e1f;
  width: 77%;
  margin: 0px auto;
  padding: 10px 5px;
  border-radius: 35px;
  min-height: 40px;
  background-color: #9b9b9b;
}


#course-groups .course-total-score {
  font-size: 16px;
  color: #1d1e1f;
  width: 20%;
  margin: 0px auto;
  padding: 8px 5px;
  padding-top: 12px;
  border-radius: 35px;
  min-height: 40px;
  background-color: #9b9b9b;
  display: flex;
}

#course-groups .question-body {
  font-size: 16px;
  color: white;
  width: 70%;
  margin: 0px auto;
  padding: 0px;
  border-radius: 35px;
  min-height: 25px;
  background: transparent;
  display: flex;
}


#course-groups .question-scores-count {
  font-size: 10px;
  color: #d8d8d8;
  width: 5%;
  margin: 0px auto;
  padding: 0px;
  border-radius: 35px;
  min-height: 25px;
  background: transparent;
  display: flex;
}

#course-groups .question-score {
  font-size: 16px;
  color: #000000;
  width: 20%;
  margin: 0px auto;
  padding: 0px;
  border-radius: 35px;
  min-height: 25px;
  background-color: #ffffff;
  display: flex;
}

#course-groups .ta-total-score-container {
  color: #fedc97;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  margin-top: 50px;
  margin-bottom: -30px;
}
#course-groups .ta-total-score-text {
  font-size: 17px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
}

#course-groups .ta-total-score {
  padding: 50px 20px 10px 10px;
  font-size: 85px;
}

#course-groups .course-groups-col .course-title,
#course-groups .course-groups-col .course-total-score{
  cursor: pointer;
}

#course-groups .course-groups-col .course-title:hover,
#course-groups .course-groups-col .course-total-score:hover{
  background-color: #eeeeee;
}

#course-groups .course-groups-col .active{
  background-color: #fedc97;
}

#course-groups .course-groups-col .active:hover{
  background-color: #fedc97;
}

</style>