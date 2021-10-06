<template>
  <transition name="fade">
    <!-- <div class="menu" v-if="value"> -->
    <div class="menu" v-show="value">
      <div class="header">
        <div class="container">
          <span class="close-icon" @click="close()"></span>
        </div>
      </div>

      <div class="container"></div>
    </div>
  </transition>
</template>

<script>
import { BodyScroll } from "@/services/utils/scroll";

export default {
  name: "Menu",

  props: {
    value: { type: Boolean, required: true },
  },

  watch: {
    value(v) {
      if (v) {
        BodyScroll.disable();
      } else {
        BodyScroll.enable();
      }
    },
  },

  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#6c63ff, 0.98);
  overflow: auto;

  .header {
    margin: 0rem 1.5rem;

    .container {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .close-icon {
        display: inline-block;
        -webkit-tap-highlight-color: transparent;

        &::before {
          content: "\00D7";
          color: white;
          font-size: 4rem;
        }
      }
    }
  }

  .container {
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
