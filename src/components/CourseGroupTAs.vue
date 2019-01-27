<template>
  <div class="ui contaienr" id="course-group-tas-main-container">
    <template v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </template>
    <template v-else>
      <div class="course-group-tas-container" id="prev-term-tas-container">
        <div class="course-group-tas-header">
          <div style="margin: auto">
            ترم قبل
          </div>
        </div>

        <div v-for="grader in apidata.prev_term_graders" style="
          width: 230px;
          height: 160px;
          border-radius: 45px;
          border: 1px solid #979797;
          background-color: #d8d8d8;
          margin: 10px auto;">
          <div style="margin: auto;">
            <svg style="background-color:white; border-radius: 200px; padding: 5px;" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 -256 1792 2000">
            <g transform="matrix(1,0,0,-1,197.42373,1300.6102)">
                <path d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"/>
            </g>
            </svg>
          </div>
          <div style="color: #000000;">
            <div style="margin: auto; width: 100%;">
              {{ grader.grader_profile.first_name }} {{ grader.grader_profile.last_name }}
            </div>
          </div>
          <div style="color: #000000;">
            <div style="margin: auto;">
              امتیاز کل {{ grader.score }}
            </div>
          </div>
        </div>

      </div>
      <div class="course-group-tas-container" id="cur-term-tas-container">
        <div class="course-group-tas-header">
          <div style="margin: auto">
            ترم جاری
          </div>
        </div>
        <div id="gradery-request-btn" class="show-modal" modal="gradery-request-modal">
          <div style="margin: auto">
            <svg id="SVGDoc" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 28 28"><defs><path d="M178.47292,173.04302h-10.52402v-10.52408c0,-0.47941 -0.651,-1.51894 -1.95294,-1.51894c-1.30194,0 -1.95294,1.03959 -1.95294,1.51894v10.52413h-10.52408c-0.47935,-0.00005 -1.51894,0.65095 -1.51894,1.95283c0,1.30189 1.03959,1.95295 1.51894,1.95295h10.52413v10.52413c0,0.4793 0.65095,1.51894 1.95295,1.51894c1.302,0 1.95294,-1.03964 1.95294,-1.51894v-10.52413h10.52413c0.4793,0 1.51894,-0.65095 1.51894,-1.95295c0,-1.302 -1.03975,-1.95288 -1.51911,-1.95288z" id="Path-0"/></defs><desc>Generated with Avocode.</desc><g transform="matrix(1,0,0,1,-152,-161)"><g><title>Path</title><use xlink:href="#Path-0" fill="#000000" fill-opacity="1"/></g></g></svg>
          </div>
        </div>
      </div>
    </template>
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
      axios.get(this.$store.state.hostUrl + '/api/v1/course-group-tas/' + this.$route.params.course_group_id)
        .then(function (response) {
          console.log(response.data)
          vinst.apidata = response.data;

          vinst.loading = false;

        })
        .catch(function (error) {

          console.log(error);

        })
    }
  },
  mounted(){
    this.getCourseGroupTAs();
  }
}
</script>

<style>
#course-group-tas-main-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
.course-group-tas-container {
  padding: 10px 0px;
  margin: auto;
  margin-top: 60px;
  min-height: 100px;
  border-radius: 38px;
  background-color: #1d1e1f;
  font-size: 20px;
  font-weight: 100;
  direction: rtl;
}

#prev-term-tas-container {
  width: 27%;
}
#cur-term-tas-container {
  width: 64%;
}
.course-group-tas-header {
  width: 160px;
  height: 40px;
  font-size: 17px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 35px;
  background-color: #4a4a4a;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
}

#prev-term-tas-container .course-group-tas-header {
  margin: -35px auto 0px auto;
}

#cur-term-tas-container .course-group-tas-header {
  margin: -35px 30px 0px 0px;
}

#gradery-request-btn {
  float: left;
  width: 140px;
  height: 33px;
  font-size: 17px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 35px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  margin: -35px 30px 0px 30px;
  padding-top: 5px;
  cursor: pointer;
}

@media screen and (min-width: 734px){

}

@media screen and (max-width: 733px){
  
}

</style>