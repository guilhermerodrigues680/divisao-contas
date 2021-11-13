<template>
  <main class="home">
    <section>
      <div class="app-section-container">
        <img class="banner" src="@/assets/img/undraw_Vault_re_s4my.svg" alt="Banner do site" />
        <h1>Bem vindo a plataforma de gestão de contas</h1>
        <h2>Tire aqui os relatórios dos custos mensais.</h2>

        <form class="form-bills" @submit.prevent="makeReport()">
          <div class="form-bills__bill" v-for="(bill, idx0) in bills" :key="idx0">
            <div>{{ bill.name }}</div>
            <div>{{ bill.cost | currency }}</div>
            <div>{{ payers[bill.payer].name }}</div>
            <div>
              <span v-for="(percent, payer) in bill.formOfDivision" :key="payer">
                {{ payer }}: {{ percent | percent }}
              </span>
            </div>
          </div>
          <button>Gerar Relatório</button>
        </form>

        <!-- Memoria de calculo -->
        <div class="analytical-result" v-show="analyticalResult.length > 0">
          <table>
            <caption>
              Relatório Analítico
            </caption>

            <thead>
              <tr>
                <th>Conta</th>
                <th>Pagante</th>
                <th>Valor da conta</th>
                <th>Quem pagará quem</th>
                <th>Quanto cada um pagará da conta</th>
              </tr>
            </thead>

            <tbody>
              <!-- Cada conta -->
              <tr v-for="(bill, idx0) in analyticalResult" :key="idx0">
                <!-- Nome da conta -->
                <td>{{ bill.bill.name }}</td>

                <!-- Pagante da conta -->
                <td>{{ payers[bill.payer].name }}</td>

                <!-- Custo da conta -->
                <td>{{ bill.total | currency }}</td>

                <!-- Forma de pagamento -->
                <td>
                  <table>
                    <tr v-for="(toObj, from) in bill.formOfpayment" :key="from">
                      <td>
                        {{ payers[from].name }} &rarr; {{ payers[toObj.to].name }} :
                        {{ toObj.total | currency }}
                      </td>
                    </tr>
                  </table>
                </td>

                <!-- Total de cada pagante -->
                <td>
                  <table>
                    <tr v-for="(total, payer) in bill.totalEachPayer" :key="payer">
                      <td>{{ payers[payer].name }} : {{ total | currency }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total a pagar final -->
        <div class="synthetic-result" v-show="Object.keys(syntheticResult).length > 0">
          <table>
            <caption>
              Relatório Sintético
            </caption>

            <thead>
              <tr>
                <th>Quem pagará quem Total</th>
              </tr>
            </thead>

            <tbody>
              <!-- Cada Pagador -->
              <tr v-for="(tosPayers, payer) in syntheticResult" :key="payer">
                <td>
                  <table>
                    <!-- Cada Pagador -> Recebedor -->
                    <tr v-for="(total, toPayer) in tosPayers" :key="toPayer">
                      <td>
                        {{ payers[payer].name }} &rarr; {{ payers[toPayer].name }} :
                        {{ total | currency }}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import { Money } from "v-money";
import billDivisionCalculator from "./bill-division-calculator";
import numFormat from "@/filters/num-format";

const moneyConfig = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  suffix: "",
  precision: 2,
  masked: false,
};

export default {
  name: "Home",

  components: {
    // Money,
  },

  filters: {
    percent: numFormat.percent,
    currency: numFormat.currency,
  },

  data: () => ({
    waterBill: 0,
    electricityBill: 0,
    internetBill: 0,
    money: moneyConfig,

    // Dados
    payers: {
      "uuid-0": { id: "uuid-0", name: "Guilherme" },
      "uuid-1": { id: "uuid-1", name: "Graça" },
      "uuid-2": { id: "uuid-2", name: "Larissa" },
    },
    bills: [
      Object.freeze({
        name: "Conta de Água",
        cost: 100.01,
        formOfDivision: {
          "uuid-0": 0.3333333333333333,
          "uuid-1": 0.3333333333333333,
          "uuid-2": 0.3333333333333333,
        },
        payer: "uuid-1",
      }),
      Object.freeze({
        name: "Conta de Luz",
        cost: 100.01,
        formOfDivision: {
          "uuid-0": 0.3333333333333333,
          "uuid-1": 0.3333333333333333,
          "uuid-2": 0.3333333333333333,
        },
        payer: "uuid-1",
      }),
      Object.freeze({
        name: "Conta de Internet",
        cost: 100.01,
        formOfDivision: {
          "uuid-0": 0.3333333333333333,
          "uuid-1": 0.3333333333333333,
          "uuid-2": 0.3333333333333333,
        },
        payer: "uuid-1",
      }),
    ],
    analyticalResult: [],
    syntheticResult: {},
  }),

  methods: {
    makeReport() {
      // const { waterBill, electricityBill, internetBill } = this;
      // this.$router.push({ name: "Report", params: { waterBill, electricityBill, internetBill } });

      const result = billDivisionCalculator.calcDivisionOfBills(this.bills);
      console.debug(result);
      this.analyticalResult = Object.freeze(result);
      const result1 = billDivisionCalculator.calcOnlyTotal(result);
      console.debug(result1);
      this.syntheticResult = Object.freeze(result1);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #ffffff;
  display: flex;
}

.app-section-container {
  margin: 0rem 1.5rem;

  .banner {
    display: block;
    height: auto;
    width: 100%;
    margin: 1.5rem 0rem;
    -webkit-touch-callout: none;
    user-select: none;
  }

  & > h1 {
    font-size: 1.875em;
    line-height: 1.25em;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
  }

  & > h2 {
    font-size: 0.9375em;
    line-height: 1em;
    font-weight: 400;
    text-align: center;
    margin-bottom: 1rem;
  }

  & > form {
    background: #c4c4c4;
    padding: 1rem 1rem;
    border-radius: 0.325rem;

    label {
      display: block;
      margin-bottom: 1rem;
      color: #6c63ff;
    }

    input[type="text"] {
      display: block;
      padding: 1rem 1.25rem;
      font-size: 1rem;
      line-height: 1.25;
      width: 100%;
      border-radius: 0.325rem;
      appearance: none;
      outline: none;
      user-select: none;
      border: thin solid #000000c4;
      font-weight: 500;

      &:focus {
        box-shadow: 0 0 0 3px #6c63ff;
        user-select: auto;
      }
    }

    button {
      height: 56px;
      width: 100%;
      appearance: none;
      border-radius: 0.325rem;
      user-select: none;
      background: #6c63ff;
      border: none;
      color: white;
      font-size: 1.125rem;
      font-weight: 700;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;

      &:active {
        background: #4d47c7;
      }
    }
  }

  .analytical-result {
    & > table > caption {
      border: 2px solid black;
      border-collapse: collapse;
      text-align: center;
    }

    & > table,
    & > table > thead > tr,
    & > table > thead > tr > th,
    & > table > tbody > tr,
    & > table > tbody > tr > td {
      border: 1px solid black;
      border-collapse: collapse;
      text-align: center;
    }

    & > table table {
      width: 100%;
      text-align: center;
    }
  }

  .synthetic-result {
    & > table > caption {
      border: 2px solid black;
    }

    & > table,
    & > table > thead > tr,
    & > table > thead > tr > th,
    & > table > tbody > tr,
    & > table > tbody > tr > td {
      border: 1px solid black;
      border-collapse: collapse;
      text-align: center;
    }

    & > table table {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
