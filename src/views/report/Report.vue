<template>
  <div class="view">
    <!-- Overlay report -->
    <div class="report" ref="report">
      <table>
        <caption>
          Monthly savings
        </caption>

        <thead>
          <tr>
            <th rowspan="2">Mês</th>
            <th rowspan="2">Descrição</th>
            <th rowspan="2">Valor</th>
            <th colspan="4">
              Valor para partes
            </th>
          </tr>

          <tr>
            <th>% Guilherme</th>
            <th>R$</th>

            <th>% Graça</th>
            <th>R$</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td rowspan="0">Setembro</td>
          </tr>

          <ReportTr billName="Água" :billValue="waterBill" />
          <ReportTr billName="Luz" :billValue="electricityBill" />
          <ReportTr billName="Internet" :billValue="internetBill" />
        </tbody>
      </table>
    </div>

    <button @click="makeReport()">Exportar</button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import filesaver from "file-saver";
import { fraction, number, round } from "mathjs";
import ReportTr from "./components/ReportTr.vue";

export default {
  name: "Report",

  components: {
    ReportTr,
  },

  props: {
    waterBill: Number,
    electricityBill: Number,
    internetBill: Number,
  },

  data: () => ({
    waterBillPercent: 0,
  }),

  watch: {
    waterBillPercent(v) {
      console.debug(v);
    },
  },

  created() {
    console.debug("beforeCreate");
    console.debug(this.$props);

    const isNullOrUndefined = v => v === null || v === undefined;
    if (
      isNullOrUndefined(this.waterBill) ||
      isNullOrUndefined(this.electricityBill) ||
      isNullOrUndefined(this.internetBill)
    ) {
      this.$router.push("/");
    }

    console.debug(fraction, number);
    this.waterBillPercent = round(number(fraction("2/3")), 2);
  },

  methods: {
    async makeReport() {
      let canvas;
      try {
        const el = this.$refs.report;
        canvas = await html2canvas(el);
      } catch (error) {
        console.debug(error);
        return;
      }

      canvas.toBlob(blob => {
        filesaver.saveAs(blob, "report.png");
      }, "image/png");
    },

    up(event) {
      console.debug(event);
      this.waterBillPercent = 0;
    },

    as(event) {
      console.debug(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.view {
  // min-height: 60vh;
}

.report {
  color: red;

  table {
    border-collapse: collapse;

    &,
    caption,
    th,
    & /deep/ tr,
    & /deep/ td {
      border: thin solid red;
      text-align: center;
    }

    th {
      padding: 0.5rem 1rem;
    }
  }
}
</style>
