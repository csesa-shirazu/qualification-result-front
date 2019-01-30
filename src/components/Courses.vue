<template>
  <div class="ui contaienr" id="course-groups-container">
    <div v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>
    <div v-else>
      <div id="course-groups-header">
        <div style="margin: auto">
          همه درس ها
        </div>
      </div>
      <div class="container" id="course-groups">
          <router-link v-for="course_group in apidata" :key="course_group.id"
          :to="{name: 'course-group-tas', params: {course_group_id: course_group.id}}"
          tag="div" class="course-group-tas-link">
          {{ course_group.title_fa }}
          </router-link>
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
    getCourseGroups: function(){
      let vinst = this;
      vinst.loading = true;
      axios.get(this.$store.state.hostUrl + '/api/v1/course-groups/')
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
    this.getCourseGroups();
  }
}
</script>

<style>
#course-groups-container {
  padding: 10px 0px;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 30px;
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
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 10px 30px;
}

.course-group-tas-link {
  text-align: center;
  width: 250px;
  margin: 10px auto;
  float: right;
  cursor: pointer;
  line-height: 30px;
  align-self:center;
  font-size: 18px;
}


#course-groups-header{
  width: 220px;
  height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 35px;
  background-color: #4a4a4a;
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
}


@media screen and (min-width: 734px){
  #course-groups-header{
    margin: -35px 70px 0px 0px;
  }
}

@media screen and (max-width: 733px){
  #course-groups-header{
    margin: -35px auto 0px auto;
  }
}
</style>