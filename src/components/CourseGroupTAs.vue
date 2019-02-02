<template>
  <div class="ui contaienr" id="course-group-tas-main-container">

    <div class="ui modal" id="gradery-request-modal" style="max-width: 300px;">
      <div v-if="!loading" class="content" style="width: 100%;">

        <template v-if="isAuthenticated">
          <div v-if="apidata.is_teacher">
              <div style="text-align: right; color: black; padding: 10px; ">
                {{ graderyRequest.enrollment_request_note }}
              </div>
              <div style="text-align: center;">
                  <a class="ui black button" style="cursor: pointer; margin-top: 10px;" @click="closeGraderyRequestModal()">بستن</a>
              </div>
          </div>
          <form v-else class="ui form" style="text-align: right;  direction: rtl" action="{% url 'campaigns:create' %}" method="post">
              <div class="field">
                  <p style="color: #000000; text-align: right; font-size:15px;">
                      اطلاعات مورد نیاز:<br/>
                      رشته - گرایش - سال ورود - نمرات مرتبط - سوابق گریدری (به جز ترم قبل) - توضیحات دلخواه
                  </p>
                  <textarea v-model="graderyRequest.enrollment_request_note" id="charge-amount" style="border-radius: 10px; text-align: right; direction: rtl;"></textarea>
              </div>
              <div style="text-align: center;">
                  <a class="ui button" style="cursor: pointer;" @click="closeGraderyRequestModal()">بستن</a>
                  <a class="ui black button" style="cursor: pointer" @click="submitGraderyRequest()">تایید</a>
              </div>
          </form>
        </template>

        <template v-else>
          <div style="color: #000000; text-align: center; font-size:17px; width: 100%;">
              لطفا ابتدا وارد شوید
          </div>
        </template>

      </div>
    </div>

    <div v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>
    <template v-else>
      <div style="width: 100%; text-align: right; color: #000000; font-size: 20px; margin: 10px; margin-right: 60px;">
        {{ apidata.course_group.title_fa }}
        </div>
      <div class="course-group-tas-container" id="prev-term-tas-container">
        <div class="course-group-tas-header">
          <div style="margin: auto">
            ترم قبل
          </div>
        </div>

        <router-link v-for="grader in apidata.prev_term_graders"
        :to="{name: 'ta-profile', params: {profile_id: grader.grader_profile.id}}"
          tag="div"
         class="ta-container">
          <div style="width: 100%; display: flex;">
            <svg style="margin: 0px auto 5px auto; background-color:white; border-radius: 200px; padding: 5px;" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 -256 1792 2000">
            <g transform="matrix(1,0,0,-1,197.42373,1300.6102)">
                <path d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"/>
            </g>
            </svg>
          </div>
          <div style="width: 100%; display: flex;">
            <div style="margin: auto; color: #000000;">
              {{ grader.grader_profile.first_name }} {{ grader.grader_profile.last_name }}
            </div>
          </div>
          <div style="width: 100%; display: flex;" v-if="grader.score">
            <div style="margin: auto; color: #000000;">
              امتیاز کل {{ grader.score }}
            </div>
          </div>
        </router-link>

      </div>
      <div class="course-group-tas-container" id="cur-term-tas-container">
        <div class="course-group-tas-header">
          <div style="margin: auto">
            ترم جاری
          </div>
        </div>
        <div id="gradery-request-btn" class="show-modal" @click="showGraderyRequestModal()">
          <div style="margin: auto">
            <svg id="SVGDoc" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 28 28"><defs><path d="M178.47292,173.04302h-10.52402v-10.52408c0,-0.47941 -0.651,-1.51894 -1.95294,-1.51894c-1.30194,0 -1.95294,1.03959 -1.95294,1.51894v10.52413h-10.52408c-0.47935,-0.00005 -1.51894,0.65095 -1.51894,1.95283c0,1.30189 1.03959,1.95295 1.51894,1.95295h10.52413v10.52413c0,0.4793 0.65095,1.51894 1.95295,1.51894c1.302,0 1.95294,-1.03964 1.95294,-1.51894v-10.52413h10.52413c0.4793,0 1.51894,-0.65095 1.51894,-1.95295c0,-1.302 -1.03975,-1.95288 -1.51911,-1.95288z" id="Path-0"/></defs><desc>Generated with Avocode.</desc><g transform="matrix(1,0,0,1,-152,-161)"><g><title>Path</title><use xlink:href="#Path-0" fill="#000000" fill-opacity="1"/></g></g></svg>
          </div>
        </div>
      <div  style="display: flex; flex-wrap:wrap; padding: 0px 40px;">
        <router-link v-for="grader in apidata.cur_term_graders"
        :to="{name: 'ta-profile', params: {profile_id: grader.grader_profile.id}}"
          tag="div"
         class="ta-container">
          <div style="width: 100%; display: flex;">
            <svg style="margin: 0px auto 5px auto; background-color:white; border-radius: 200px; padding: 5px;" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 -256 1792 2000">
            <g transform="matrix(1,0,0,-1,197.42373,1300.6102)">
                <path d="M 1408,131 Q 1408,11 1335,-58.5 1262,-128 1141,-128 H 267 Q 146,-128 73,-58.5 0,11 0,131 0,184 3.5,234.5 7,285 17.5,343.5 28,402 44,452 q 16,50 43,97.5 27,47.5 62,81 35,33.5 85.5,53.5 50.5,20 111.5,20 9,0 42,-21.5 33,-21.5 74.5,-48 41.5,-26.5 108,-48 Q 637,565 704,565 q 67,0 133.5,21.5 66.5,21.5 108,48 41.5,26.5 74.5,48 33,21.5 42,21.5 61,0 111.5,-20 50.5,-20 85.5,-53.5 35,-33.5 62,-81 27,-47.5 43,-97.5 16,-50 26.5,-108.5 10.5,-58.5 14,-109 Q 1408,184 1408,131 z m -320,893 Q 1088,865 975.5,752.5 863,640 704,640 545,640 432.5,752.5 320,865 320,1024 320,1183 432.5,1295.5 545,1408 704,1408 863,1408 975.5,1295.5 1088,1183 1088,1024 z"/>
            </g>
            </svg>
          </div>
          <div style="width: 100%; display: flex;">
            <div style="margin: auto; color: #000000;">
              {{ grader.grader_profile.first_name }} {{ grader.grader_profile.last_name }}
            </div>
          </div>
          <div style="width: 100%; display: flex;" v-if="grader.score">
            <div style="margin: auto; color: #000000;">
              امتیاز کل {{ grader.score }}
            </div>
          </div>
          <div style="width: 100%; display: flex;" v-if="grader.status == 'pending'">
            <div style="margin: auto; color: #000000;">
              تایید نشده
            </div>
          </div>
          <div style="width: 100%; display: flex;" v-else-if="grader.status == 'approved'">
            <div style="margin: auto; color: green;">
              تایید شده
            </div>
          </div>
          <div style="width: 100%; display: flex;" v-else-if="grader.status == 'rejected'">
            <div style="margin: auto; color: red;">
              رد شده
            </div>
          </div>
          <div style="width: 100%; display: flex; margin-top: 7px;" v-if="grader.accessable">
            <div style="width: 47%;
                        margin: auto;
                        padding: 2px;
                        height: 30px;
                        text-align: center;
                        border-radius: 45px;
                        color: black;
                        border: 1px solid #aaaaaa;
                        background-color: #fedc97;" @click.prevent="showGraderyRequestEditModal(grader)">
              ویرایش
            </div>
            <div style="width: 47%;
                        margin: auto;
                        padding: 2px;
                        height: 30px;
                        text-align: center;
                        border-radius: 45px;
                        background-color: #6a061e;" @click.prevent="cancelGraderyRequest(grader)">
              لغو
            </div>
          </div>
          <div style="width: 100%; display: flex; margin-top: 7px; padding: 0px 15px;" v-if="apidata.is_teacher">
            <div style="width: 47%;
                        margin: auto;
                        padding: 2px;
                        height: 30px;
                        text-align: center;
                        border-radius: 45px;
                        color: black;
                        border: 1px solid #aaaaaa;
                        background-color: #fedc97;" @click.prevent="approveGraderyRequest(grader)">
              تایید
            </div>
            <div style="width: 45%;
                        margin: auto;
                        padding: 2px;
                        height: 30px;
                        text-align: center;
                        border-radius: 45px;
                        background-color: #6a061e;" @click.prevent="rejectGraderyRequest(grader)">
              رد
            </div>
          </div>
          <div style="width: 100%; display: flex; margin-top: 7px; padding: 0px 15px;" v-if="apidata.is_teacher">
            <div style="width: 100%;
                        margin: auto;
                        padding: 2px;
                        height: 30px;
                        font-size: 15px;
                        text-align: center;
                        border-radius: 45px;
                        color: white;
                        border: 1px solid #aaaaaa;
                        background-color: #1d1e1f;" @click.prevent="showGraderyRequestNote(grader)">
              یادداشت گریدر
            </div>
          </div>
        </router-link>
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
      apidata : {

      },
      graderyRequest : {
        enrollment_request_note: ''
      },
      loading: true,
    };
  },
  computed:{
      isAuthenticated(){
          return this.$store.getters.isAuthenticated;
      }
  },
  watch: {
    '$route': 'getCourseGroups'
  },
  mixins:[
      alignFooterMixin
  ],
  methods: {
    showGraderyRequestModal(){
      $("#gradery-request-modal").modal('show');
    },
    closeGraderyRequestModal(){
      $("#gradery-request-modal").modal('hide');
    },
    approveGraderyRequest(graderyRequest){
      let vinst = this;
      vinst.loading = true;
      axios.get(this.$store.state.hostUrl + '/api/v1/approve-gradery-request/' + graderyRequest.id + '/',
      {
        headers: {
          'Authorization' : 'Token ' + vinst.$store.getters.api_token
        }
      })
        .then(function (response) {
          console.log(response.data)
          vinst.getCourseGroupTAs();
          alert('درخواست با موفقیت قبول شد');
        })
        .catch(function (error) {

          console.log(error);
          vinst.getCourseGroupTAs();
          alert('خطا در قبول درخواست');

        })
    },
    rejectGraderyRequest(graderyRequest){
      let vinst = this;
      vinst.loading = true;
      axios.get(this.$store.state.hostUrl + '/api/v1/reject-gradery-request/' + graderyRequest.id + '/',
      {
        headers: {
          'Authorization' : 'Token ' + vinst.$store.getters.api_token
        }
      })
        .then(function (response) {
          console.log(response.data)
          vinst.getCourseGroupTAs();
          alert('درخواست با موفقیت رد شد');
        })
        .catch(function (error) {

          console.log(error);
          vinst.getCourseGroupTAs();
          alert('خطا در رد کردن درخواست');

        })
    },
    cancelGraderyRequest(graderyRequest){
      let vinst = this;
      vinst.loading = true;
      axios.delete(this.$store.state.hostUrl + '/api/v1/cancel-gradery-request/' + graderyRequest.id + '/',
      {
        headers: {
          'Authorization' : 'Token ' + vinst.$store.getters.api_token
        }
      })
        .then(function (response) {
          console.log(response.data)
          vinst.getCourseGroupTAs();
          alert('درخواست با موفقیت لغو شد');
        })
        .catch(function (error) {

          console.log(error);
          vinst.getCourseGroupTAs();
          alert('خطا در لغو درخواست');

        })
    },
    showGraderyRequestEditModal(graderyRequest){
      this.graderyRequest.enrollment_request_note = graderyRequest.enrollment_request_note;
      $("#gradery-request-modal").modal('show');
    },
    showGraderyRequestNote(graderyRequest){
      this.graderyRequest.enrollment_request_note = graderyRequest.enrollment_request_note;
      $("#gradery-request-modal").modal('show');
    },
    getCourseGroupTAs: function(){
      let vinst = this;
      vinst.loading = true;
      let headers = {};
      if(this.isAuthenticated){
        headers = {
          'Authorization' : 'Token ' + vinst.$store.getters.api_token
        }
      }
      axios.get(this.$store.state.hostUrl + '/api/v1/course-group-tas/' + this.$route.params.course_group_id,
      {
        headers: headers
      })
        .then(function (response) {
          console.log(response.data)
          vinst.apidata = response.data;
          vinst.loading = false;
          $("#gradery-request-modal").modal('hide');
        })
        .catch(function (error) {

          console.log(error);

        })
    },
    submitGraderyRequest: function(){
      let vinst = this;
      vinst.loading = true;
      axios.post(this.$store.state.hostUrl + '/api/v1/gradery-request/' + this.$route.params.course_group_id + '/',
      this.graderyRequest,
      {
        headers: {
          'Authorization' : 'Token ' + vinst.$store.getters.api_token
        }
      })
        .then(function (response) {
          console.log(response.data)
          $("#gradery-request-modal").modal('hide');
          vinst.getCourseGroupTAs();
          alert('درخواست با موفقیت ثبت شد');
        })
        .catch(function (error) {

          console.log(error);
          $("#gradery-request-modal").modal('hide');
          vinst.getCourseGroupTAs();
          alert('خطا در ثبت درخواست');

        })
    }
  },
  mounted(){
    this.getCourseGroupTAs();
  },
}
</script>

<style>
.ta-container {
  cursor: pointer;
  width: 70%;
  min-width: 150px;
  max-width: 210px;
  height: 100%;
  min-height: 170px;
  border-radius: 45px;
  border: 1px solid #979797;
  background-color: #d8d8d8;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  padding:13px;
  margin: 15px auto;
  line-height: 23px;
}

#course-group-tas-main-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
.course-group-tas-container {
  padding: 10px 0px;
  margin: auto;
  margin-top: 40px;
  min-height: 100px;
  border-radius: 38px;
  background-color: #1d1e1f;
  font-size: 20px;
  font-weight: 100;
  direction: rtl;
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
  #prev-term-tas-container {
    width: 25%;
  }
  #cur-term-tas-container {
    width: 65%;
  }
  #gradery-request-btn {
    width: 140px;
    height: 33px;
  }
}

@media screen and (max-width: 733px){
  #prev-term-tas-container {
    width: 300px;
  }
  #cur-term-tas-container {
    width: 300px;
  }
  #gradery-request-btn {
    width: 60px;
    height: 40px;
  }
  
}

</style>