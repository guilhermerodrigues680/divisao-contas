<template>
  <!-- Uso o change ao inves do input pois o v-money usa o v-model.lazy -->
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
    numericValue(value) {
      if (typeof value === "number") {
        return value;
      }

      if (!value) {
        value = "";
      }

      return +value
        .replace(/%/g, "")
        .replace(/\./g, "")
        .replace(/,/g, ".");
    },

    change(event) {
      // FIXME: Corrigir efeito ao colar
      // FIXME: Corrigir ao digitar numero negativo
      const before = this.value;
      event.target.value = event.target.value.replace(/-/, "");
      let newValue = event.target.value;
      const numericValue = this.numericValue(newValue);

      // console.debug("change", event, newValue, numericValue);
      if (numericValue > 100) {
        // console.debug("numericValue > 100");
        event.target.value = before;
        this.$emit("input", event.target.value);
        return;
      }

      this.$emit("input", newValue);
    },
  },
};
</script>
