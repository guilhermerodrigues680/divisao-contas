<template>
  <tr>
    <td>{{ billName }}</td>
    <td>{{ billValue }}</td>

    <td>
      <InputPercent v-model="guilherme.percent" @input="updatePercent('guilherme')" />
    </td>
    <td>
      <InputCurrency v-model="guilherme.value" />
    </td>

    <td>
      <InputPercent v-model="graca.percent" @input="updatePercent('graca')" />
    </td>

    <td>
      <InputCurrency v-model="graca.value" />
    </td>
  </tr>
</template>

<script>
import { round } from "mathjs";
import InputPercent from "@/components/InputPercent.vue";
import InputCurrency from "@/components/InputCurrency.vue";

export default {
  name: "ReportTr",

  components: {
    InputPercent,
    InputCurrency,
  },

  props: {
    billName: { type: String, default: "" },
    billValue: { type: Number, default: 0 },
  },

  data: () => ({
    guilherme: {
      percent: 66.67,
      value: 0,
    },
    graca: {
      percent: 100 - 66.67,
      value: 0,
    },
  }),

  created() {
    this.guilherme.value = round(this.billValue * (this.guilherme.percent / 100), 2);
    this.graca.value = round(this.billValue * (this.graca.percent / 100), 2);
  },

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

    updatePercent(person) {
      console.debug(person);
      switch (person) {
        case "guilherme":
          {
            const percent = this.numericValue(this.guilherme.percent);
            this.guilherme.value = round(this.billValue * (percent / 100), 2);
          }
          break;
        case "graca":
          {
            const percent = this.numericValue(this.guilherme.percent);
            this.graca.value = round(this.billValue * (percent / 100), 2);
          }
          break;
        default:
          {
            console.debug("Pessoa desconhecida", person);
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  td {
    input {
      border: none;
      width: 5rem;
      text-align: center;
    }
  }
}
</style>
