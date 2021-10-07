<template>
  <tr>
    <td>{{ billName }}</td>
    <td>{{ billValue }}</td>

    <td>
      <InputPercent v-model="guilherme.percent" />
    </td>
    <td>
      <!-- <InputPercent v-model="guilherme.value" /> -->
      {{ guilherme.percent }}
    </td>

    <td>
      <InputPercent v-model="graca.percent" />
    </td>

    <td>
      <InputPercent v-model="graca.value" />
    </td>
  </tr>
</template>

<script>
import { round } from "mathjs";
import InputPercent from "@/components/InputPercent.vue";

export default {
  name: "ReportTr",

  components: {
    InputPercent,
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
