import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/report",
    name: "Report",
    component: () => import(/* webpackChunkName: "report" */ "@/views/report/Report.vue"),
    props: true,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
