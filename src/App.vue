<template>
  <div id="app">
    <ta-profile :alignFooter='alignFooter'></ta-profile>
    <app-footer></app-footer>
  </div>
</template>

<script>


    const alignFooter = function(){
        let tp = $(window).height();
        tp -= $("#ta-profile-container").outerHeight(true);
        tp -= $("#footer").outerHeight();
        tp -= $("#nav").innerHeight();
        tp = Math.max(50,tp);
        console.log(tp);
        $("#footer").css('top', tp);
    }
    $(document).ready(function(){
        alignFooter();
        $(window).resize(alignFooter);
    })

import taProfile from './components/taProfile.vue'
import appFooter from './components/Footer.vue'
export default {
  name: 'app',
  data () {
    return {

    };
  },
  components: {
    taProfile,
    appFooter
  },
  methods: {
    alignFooter: alignFooter,
  },
  update(){
    alignFooter();
  }
}
</script>

<style>
body {
  background-color: #d8d8d8;
  color: white;
}

@font-face {
	font-family:'IRANSans';
	src: url('/static/fonts/');
	src: url('/static/fonts/iransans/IRANSansWeb(FaNum).eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('/static/fonts/iransans/IRANSansWeb(FaNum).woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('/static/fonts/iransans/IRANSansWeb(FaNum).woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('/static/fonts/iransans/IRANSansWeb(FaNum).ttf') format('truetype');
		 font-style: normal;
		 font-weight: normal;
}

@font-face {
	font-family:'IRANSans-light';
	src: url('/static/fonts/');
	src: url('/static/fonts/iransans/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('/static/fonts/iransans/IRANSansWeb_Light.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('/static/fonts/iransans/IRANSansWeb_Light.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('/static/fonts/iransans/IRANSansWeb_Light.ttf') format('truetype');
		 font-style: normal;
		 font-weight: normal;
}

@font-face {
	font-family:'IRANSans-medium';
	src: url('/static/fonts/');
	src: url('/static/fonts/iransans/IRANSansWeb_Medium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('/static/fonts/iransans/IRANSansWeb_Medium.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('/static/fonts/iransans/IRANSansWeb_Medium.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('/static/fonts/iransans/IRANSansWeb_Medium.ttf') format('truetype');
		 font-style: normal;
		 font-weight: normal;
}

p, a, label, h1, h2, h3, h4, h5, h6, body{
    font-family: "IRANSans";
}
p {
    font-size: 90%;
}

#nav .ui.container .right.item {
  padding: 7px 15px;
}
.menu.secondary {
  border: 0px;
  padding: 10px;
}
.pusher {
  /* background: url('http://localhost:8080/static/devcom.png'); */
  background-color: #eeeeee;
  padding-top: 0px;
}

.ui#navbar {
  background: transparent;
  font-family: IRANSans;
}
.ui#container {
  margin-top: 150px;
  /* visibility: hidden; */
  min-height: 610px;
  margin-bottom: 40px;
  background-color: white;

  box-shadow: 2px 0px 70px 1px rgb(189, 179, 179);
  border-radius: 5px;

  padding: 50px 30px;
  padding-bottom: 0px !important;
}

.slide-enter-active {
    animation: slide-in .3s ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
