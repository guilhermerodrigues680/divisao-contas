<template>
  <div id="app">
    <AppHeader />
    <router-view class="router-view" />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",

  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    log: [],
  }),

  mounted() {
    console.debug("mounted");
    window.addEventListener("resize", this.appHeight);
    setTimeout(this.appHeight(), 1000);
  },

  beforeDestroy() {
    console.debug("beforeDestroy");
    window.removeEventListener("resize", this.appHeight);
  },

  methods: {
    appHeight() {
      console.debug(this.$el);
      this.$el.style.setProperty("--app-height", `${window.innerHeight}px`);
      this.log.push(`${new Date().toLocaleString()} | ${window.innerHeight}px`);
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #c4c4c4;
}
</style>

<style lang="scss" scoped>
#app {
  font-family: "Roboto";
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  // --app-height é injetado via javascript
  // https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
  min-height: var(--app-height, 100vh);

  .router-view {
    flex: 1;
  }
}
</style>
