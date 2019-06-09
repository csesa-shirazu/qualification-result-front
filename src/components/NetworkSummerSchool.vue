<template>
  <div class="ui contaienr" id="main-content-container">
    <div v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </div>
    <div v-else>
      <div class="container" id="main-content">
        <p>
          مدرسه تابستانی امنیت و شبکه
        </p>
        <br />
        <p>
          ارائه دهنده: مهندس تاج بخش
        </p>
        <br />
        <p>
          من را از دوره باخبر کن
        </p>
        <br />

        <div class="ui icon input" :class="{loading : loadingLocal, error: errors.email}">
          <input type="text" @keypress.enter="submitSubscription" v-model="email" style="font-size: 15px; direction: ltr; width: 300px" placeholder="ایمیل"/>
          <i class="icon"></i>
          <button class="ui button" @click="submitSubscription">تایید</button>
        </div>

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
      loadingLocal: false,
      loading: false,
      email: null,
      errors: {
        email: null
      }
    };
  },
  mixins:[
      alignFooterMixin
  ],
  methods: {
    emailValid(email){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submitSubscription: function(){
      this.errors.email = null
      if(!this.email){
        this.errors.email = 'لطفا ایمیل را وارد کنید'
      } else if(!this.emailValid(this.email)){
        this.errors.email = 'لطفا یک ایمیل معتبر وارد کنید'
      } else {
        let vinst = this;
        vinst.loadingLocal = true;
        axios.post(this.$store.state.hostUrl + '/api/v1/campaigns/subscribe/?format=json',
        {
          campaign: 201,
          email: this.email
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(function (response) {
          console.log(response.data)
          
          alert('با موفقیت ثبت شد')
          vinst.loadingLocal = false;

        })
        .catch(function (error) {

          alert('خطا، لطفا مجددا سعی کنید')
          console.log(error);
          vinst.loadingLocal = false;
        })
      }
      if(this.errors.email){
        alert(this.errors.email)
      }
    }
  }
}
</script>

<style>
#main-content-container {
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

#main-content {
  margin: 0px auto 30px auto;
  width: 100%;
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


#main-content-header{
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
  #main-content-header{
    margin: -35px 70px 0px 0px;
  }
}

@media screen and (max-width: 733px){
  #main-content-header{
    margin: -35px auto 0px auto;
  }
}
</style>