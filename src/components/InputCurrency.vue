<template>
  <!-- Uso o change ao inves do input pois o v-money usa o v-model.lazy -->
  <input
    :value="value"
    @change="change($event)"
    type="text"
    inputmode="numeric"
    v-money="vmoneyCurrencyConfig"
  />
</template>

<script>
import { VMoney } from "v-money";

const vmoneyCurrencyConfig = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  suffix: "",
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
    vmoneyCurrencyConfig,
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
      // const before = this.value;
      event.target.value = event.target.value.replace(/-/, "");
      let newValue = event.target.value;
      // const numericValue = this.numericValue(newValue);

      // if (numericValue > 100) {
      //   event.target.value = before;
      //   this.$emit("input", event.target.value);
      //   return;
      // }

      this.$emit("input", newValue);
    },
  },
};
</script>
