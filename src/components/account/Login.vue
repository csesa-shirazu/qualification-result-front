<template>
  <div class="ui middle aligned center aligned grid" style="margin-top: 3em;">
    <div class="column">
      <h2 class="ui teal header">
        <div class="content">
          Login to your account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="username" v-model="user.username" placeholder="Email">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="user.password" placeholder="Password">
            </div>
          </div>
          <div class="ui fluid large teal submit button" @click="submit()">Login</div>
        </div>
        <div class="ui error message"></div>
      </form>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
          alert("با موفقیت وارد شدید");
          console.log(response.data)
          this.$store.commit("updateToken", response.data.token);
          if (this.$route.query.next) {
            this.$router.push(this.$route.query.next);
          } else {
            // this.$router.push({ name: "home" });
          }
          vinst.loading = false;
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
      // next({ name: "home" });
    }
    next();
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
