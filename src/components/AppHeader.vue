<template>
  <div>
    <Menu v-model="menu" />

    <header>
      <div class="header-container">
        <div class="logo" @click="goHome()">HOME</div>

        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="openMenu()"
        >
          <path d="M36 20H12V22H36V20Z" fill="#6c63ff" />
          <path d="M36 26H20V28H36V26Z" fill="#6c63ff" />
        </svg>
      </div>
    </header>
  </div>
</template>

<script>
import Menu from "./Menu.vue";

export default {
  components: {
    Menu,
  },

  data: () => ({
    menu: false,
  }),

  methods: {
    openMenu() {
      this.menu = true;
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 78px;
  background: #c4c4c4;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0rem 1.5rem;
    height: 100%;

    .logo {
      color: #ffffff;
      font-weight: 100;
      border-radius: 4px;
      padding: 0.5rem;
      border: thin solid #ffffff;
    }
  }
}
</style>
