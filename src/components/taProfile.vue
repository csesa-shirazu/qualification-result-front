<template>
  <div class="ui contaienr" id="ta-profile-container">
    <div v-if="appState == 'initial'" style="text-align: center; padding-top:30px">
        نام گریدر را از منوی بالا انتخاب کنید
    </div>
    <div v-else-if="appState == 'grader-is-set'">
        <div v-if="loading" class="ui active inverted dimmer">
            <div class="ui text loader">Loading</div>
        </div>
        <div v-else>
          <div style="text-align: right; padding: 17px 60px 17px 0px;">
            درس های تدریس کرده
          </div>
          <div class="container" id="ta-qualification">
              
              <div class="ta-qualification-col ta-qualification-col-first">
                  <div class="ta-qualification-col-content" :data-content="'از ' + qualification.participant_count + ' رای'" data-position="top right" v-for="qualification in apidata" @click="selectedQualification = qualification">
                    
                    <div class="course-title" :class="{'active': selectedQualification==qualification}">
                      {{ qualification.course }}
                    </div>
                    <div class="course-total-score" :class="{'active': selectedQualification==qualification}">
                      <div style="margin: auto">
                        <template v-if="isNaN(qualification.total)">
                          -
                        </template>
                        <template v-else>
                          {{ qualification.total }}%
                        </template>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="ta-qualification-col ta-qualification-col-second">
                  <div class="ta-qualification-col-header">
                    <div style="margin: auto">
                      امتیازات
                    </div>
                  </div>
                  <div class="ta-qualification-col-content" v-for="qa in selectedQualification.scores">
                    <div class="question-body">
                      <div style="margin: auto; margin-right: 10px;">
                        {{ qa.question }}
                      </div>
                    </div>
                    <div class="question-scores-count">
                      <div style="margin: auto">
                        {{ qa.count }}
                      </div>
                    </div>
                    <div class="question-score">
                      <div style="margin: auto">
                        {{ qa.answer }}%
                      </div>
                    </div>
                  </div>
                  <div class="ta-total-score-container">
                    <div class="ta-total-score-text">
                      <div style="margin: auto">
                         امتیاز در درس
                      </div>
                    </div>
                    <div class="ta-total-score">
                      <div style="margin: auto">
                        <template v-if="isNaN(selectedQualification.total)">
                          -
                        </template>
                        <template v-else>
                          {{ selectedQualification.total }}%
                        </template>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="ta-qualification-col ta-qualification-col-third">
                      <div class="ta-qualification-col-header">
                        <div style="margin: auto">
                          نظرات
                        </div>
                      </div>
                      <div class="ta-qualification-col-third-content">
                      نظرات به صورت عمومی قابل نمایش نیستند
                      </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed:{
      appState(){
          return this.$store.getters.appState;
      },
      graderId(){
          return this.$store.getters.graderId;
      }
  },
  watch: {
      graderId (newCount, oldCount) {
        this.getGraderProfile();
      }
  },
  data () {
    return {
      apidata : [
      ],
      loading: true,
      selectedQualification: {
        course: '',
        scores: []
      }
    };
  },
  props:[
      'alignFooter'
  ],
  methods: {
    getGraderProfile: function(){
      let vinst = this;
      vinst.loading = true;
      axios.get(this.$store.state.hostUrl + '/api/v1/qualification/result/cse-gradery/' + this.graderId)
        .then(function (response) {
          console.log(response.data)
          vinst.apidata = response.data;
          vinst.apidata.forEach(qualification => {
            let sum = 0;
            let coeff = 0;
            qualification.scores.forEach(element => {
              sum += Number(element.answer) * Number(element.coeff);
              if(element.count > 0)
                coeff += Number(element.coeff);
            });
            qualification.total = Math.round(sum / coeff);
          })

          vinst.selectedQualification = response.data[0];

          $(document).ready(function(){
              $('.ta-qualification-col-content').popup();
          });
          vinst.loading = false;

        })
        .catch(function (error) {

          console.log(error);

        })
    }
  },
  updated(){
    this.alignFooter();
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

#ta-qualification {
  margin: 0px auto 30px auto;
  width: 100%;
  text-align: right;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

#ta-qualification .ta-qualification-col{
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

#ta-qualification .ta-qualification-col-second{
    border-right: 1px solid #ffffff;
    border-left: 2px dashed #ffffff;
}

#ta-qualification .ta-qualification-col-third{
    text-align: center;
}

#ta-qualification .ta-qualification-col-second .ta-qualification-col-content{
  margin-bottom: 15px;
}

#ta-qualification .ta-qualification-col-third-content{
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  margin: auto;
}
#ta-qualification .ta-qualification-col-content{
  width: 100%;
  height: 100%;
  margin: 5px 0px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
}

#ta-qualification .ta-qualification-col-header{
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
  #ta-qualification .ta-qualification-col-second .ta-qualification-col-header {
    margin-top: -97px;
    margin-bottom: -97px;
  }
}

@media screen and (max-width: 733px){
  #ta-qualification .ta-qualification-col-second .ta-qualification-col-header {
    margin-top: 0px;
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 1100px){
  #ta-qualification .ta-qualification-col-third .ta-qualification-col-header {
    margin-top: -97px;
    margin-bottom: -97px;
  }
}

@media screen and (max-width: 1099px){
  #ta-qualification .ta-qualification-col-third .ta-qualification-col-header {
    margin-top: 50px;
    margin-bottom: 10px;
  }
}

#ta-qualification .course-title {
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


#ta-qualification .course-total-score {
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

#ta-qualification .question-body {
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


#ta-qualification .question-scores-count {
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

#ta-qualification .question-score {
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

#ta-qualification .ta-total-score-container {
  color: #fedc97;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  margin-top: 50px;
  margin-bottom: -30px;
}
#ta-qualification .ta-total-score-text {
  font-size: 17px;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
}

#ta-qualification .ta-total-score {
  padding: 50px 20px 10px 10px;
  font-size: 85px;
}

#ta-qualification .ta-qualification-col .course-title,
#ta-qualification .ta-qualification-col .course-total-score{
  cursor: pointer;
}

#ta-qualification .ta-qualification-col .course-title:hover,
#ta-qualification .ta-qualification-col .course-total-score:hover{
  background-color: #eeeeee;
}

#ta-qualification .ta-qualification-col .active{
  background-color: #fedc97;
}

#ta-qualification .ta-qualification-col .active:hover{
  background-color: #fedc97;
}

</style>