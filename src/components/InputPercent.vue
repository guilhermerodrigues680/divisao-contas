<template>
  <!-- Uso o change ao inves do input -->
  <input
    :value="value"
    @change="change($event)"
    type="text"
    inputmode="numeric"
    v-money="vmoneyPercentConfig"
  />
</template>

<script>
import { VMoney } from "v-money";

const vmoneyPercentConfig = {
  decimal: ",",
  thousands: ".",
  prefix: "",
  suffix: " %",
  precision: 2,
};

export default {
  directives: {
    money: VMoney,
  },

  props: {
    value: {},
  },

  data: () => ({
    vmoneyPercentConfig,
  }),

  methods: {
    change(event) {
      // FIXME: Corrigir efeito ao colar
      // FIXME: Corrigir ao digitar numero negativo
      const value = +event.target.value
        .replace(/%/g, "")
        .replace(/\./g, "")
        .replace(/,/g, ".");
      const before = this.value;
      console.debug("change", event.target.value, value);
      if (value > 100) {
        // this.guilherme.percent = before;
        event.target.value = before;
      }
      // else {
      // this.guilherme.percent = event.target.value;
      // }
      const newValue = event.target.value;
      console.debug(newValue);
      this.$emit("input", newValue);
      // this.guilherme.percent = event.target.value;
      // if (+event.target.value > 100) {
      //   this.guilherme.percent = 100;
      // }
    },
  },
};
</script>
