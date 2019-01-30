<template>
  <div class="ui middle aligned center aligned grid" style="margin-top: 3em;">
    <template v-if="loading" class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
    </template>
    <div v-else class="column">
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="username" v-model="user.username" placeholder="نام کاربری">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" @keyup.enter="submit()" name="password" v-model="user.password" placeholder="کلمه عبور">
            </div>
          </div>
          <div class="ui large black submit button" style="background-color: #545454" @click="submit()">ورود</div>
        </div>
        <div class="ui error message"></div>
      </form>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alignFooterMixin } from "../../alignFooterMixin";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  mixins:[
      alignFooterMixin
  ],
  methods: {
    submit() {
      this.loading = true;
      var vinst = this;
      axios
        .post(this.$store.state.endpoints.obtainToken, {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          console.log(response.data)
          this.$store.commit("updateToken", response.data.token);
          vinst.loading = false;
          alert("با موفقیت وارد شدید");
          if (this.$route.query.next) {
            this.$router.push(this.$route.query.next);
          } else {
            this.$router.push({ name: "courses" });
          }
        })
        .catch(error => {
          if (error.response) {
            alert("نام کاربری یا رمز عبور اشتباه است");
          } else {
            alert("خطا در ارتباط با سرور");
          }
          console.log(error);
          this.$store.commit("removeToken");
          vinst.loading = false;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('token')) {
      next({ name: "courses" });
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.image {
  margin-top: -100px;
}
.column {
  max-width: 450px;
}
</style>
