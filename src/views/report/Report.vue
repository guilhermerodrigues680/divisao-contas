<template>
  <div class="view">
    Report

    <!-- Overlay report -->
    <div class="report" ref="report">
      <table>
        <caption>
          Monthly savings
        </caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>Percentual</th>
            <th>Savings</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Água</td>
            <td>2/3</td>
            <td>{{ (waterBill * 2) / 3 }}</td>
          </tr>
          <tr>
            <td>Luz</td>
            <td>2/3</td>
            <td>{{ (electricityBill * 2) / 3 }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Internet</td>
            <td>2/3</td>
            <td>{{ (internetBill * 2) / 3 }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <button @click="makeReport()">Exportar</button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import filesaver from "file-saver";

export default {
  name: "Report",

  props: {
    waterBill: Number,
    electricityBill: Number,
    internetBill: Number,
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
    border: thin solid red;
    border-collapse: collapse;

    caption {
      border: thin solid red;
    }

    tr,
    td {
      border: thin solid red;
    }
  }
}
</style>
