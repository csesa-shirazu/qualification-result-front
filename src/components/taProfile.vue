<template>
  <div class="ui contaienr" id="ta-profile-container">
    <div v-if="appState == 'initial'">
        fweawefawe
    </div>
    <div v-else-if="appState == 'grader-is-set'">
        <div v-if="loading" class="ui active inverted dimmer">
            <div class="ui text loader">Loading</div>
        </div>
        <div v-else>
          <div style="text-align: right;">
            درس های تدریس کرده
          </div>
          <div class="container" id="ta-qualification" style="margin: 30px auto;
                  width: 90%; text-align: center;
                  display: flex; flex-wrap: wrap">
              
              <div class="ta-qualification-col" style="background: transparent;
                      border: 2px solid #707070;
                      display: flex; flex-wrap: wrap; padding: 10px;">
                  <div
                  style="width: 100%; display: flex; flex-wrap: wrap; "
                  v-for="qualification in apidata"
                  @click="selectedQualification = qualification">
                    <div class="course-title" :class="{'active': selectedQualification==qualification}">
                      {{ qualification.course }}
                    </div>
                    <div class="course-total-score" :class="{'active': selectedQualification==qualification}">
                      <div style="margin: auto">
                        85%
                      </div>
                    </div>
                  </div>
              </div>

              <div class="ta-qualification-col" style="background: transparent;
                      border: 2px solid #707070;
                      display: flex; flex-wrap: wrap; padding: 10px;">
                      <div style="
                        width: 220px;
                        height: 50px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                        border-radius: 35px;
                        background-color: #4a4a4a; margin-top: -97px; display: flex; flex-wrap: wrap">
                        <div style="margin: auto">
                          امتیازات
                        </div>
                      </div>
                  <div
                  style="width: 100%; display: flex; flex-wrap: wrap; "
                  v-for="qa in selectedQualification.scores">
                    <div class="question-body">
                      <div style="margin: auto">
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
              </div>

              <div class="ta-qualification-col" style="background: transparent;
                      border: 2px solid #707070;
                      display: flex; flex-wrap: wrap; padding: 10px;">
                      <div style="
                        width: 220px;
                        height: 50px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                        border-radius: 35px;
                        background-color: #4a4a4a; margin-top: -97px; display: flex; flex-wrap: wrap">
                        <div style="margin: auto">
                          نظرات
                        </div>
                      </div>
                  <template v-for="qualification in apidata">
                    <div class="course-title">
                      {{ qualification.course }}
                    </div>
                    <div style="width: 10%; margin: 0px auto; border-radius: 35px;">
                      85%
                    </div>
                  </template>
              </div>
          </div>
          <!-- <div v-for="qualification in apidata">
              {{ qualification.course }}
              <div v-for="score in qualification.scores">
                  {{ score.question }} | {{ score.answer }} | {{ score.count }}
              </div>
          </div> -->
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed:{
      appState(){
        console.log('khar')
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
  methods: {
    getGraderProfile: function(){
      let vinst = this;
      vinst.loading = true;
      axios.get(this.$store.state.hostUrl + '/api/v1/qualification/result/cse-gradery/' + this.graderId)
        .then(function (response) {
          console.log(response.data)
          vinst.apidata = response.data;
          vinst.selectedQualification = response.data[0]
          vinst.loading = false;

        })
        .catch(function (error) {

          console.log(error);

        })
    }
  }
}
</script>

<style>
#ta-profile-container {
  padding: 10px 30px;
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


#ta-qualification .ta-qualification-col{
    width: 260px;
    height: 100%;
    margin: 0px auto;
}

#ta-qualification .course-title {
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
  min-height: 30px;
  background: transparent;
  display: flex;
}


#ta-qualification .question-scores-count {
  font-size: 8px;
  color: #d8d8d8;
  width: 5%;
  margin: 0px auto;
  padding: 0px;
  padding-left: 10px;
  border-radius: 35px;
  min-height: 30px;
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
  min-height: 30px;
  background-color: #ffffff;
  display: flex;
}

#ta-qualification .ta-qualification-col .active{
  background-color: #fedc97;
}
</style>