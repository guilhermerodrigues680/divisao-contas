import Vue from "vue";
import App from "./App.vue";
import "@/styles/global.scss";
import router from './router'

Vue.config.productionTip = false;

// Habilitar :active pseudo-class no mobile safari
// https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
document.body.ontouchstart = () => {};

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
