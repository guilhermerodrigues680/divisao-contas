<template>
  <main class="home">
    <section>
      <div class="app-section-container">
        <img class="banner" src="@/assets/img/undraw_Vault_re_s4my.svg" alt="Banner do site" />
        <h1>Bem vindo a plataforma de gestão de contas</h1>
        <h2>Tire aqui os relatórios dos custos mensais.</h2>

        <form @submit.prevent="makeReport()">
          <label>
            Água
            <money v-model="waterBill" v-bind="money" type="text" inputmode="numeric" />
          </label>

          <label>
            Luz
            <money v-model="electricityBill" v-bind="money" type="text" inputmode="numeric" />
          </label>

          <label>
            Internet
            <money v-model="internetBill" v-bind="money" type="text" inputmode="numeric" />
          </label>

          <button>Gerar Relatório</button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
import { Money } from "v-money";

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
    Money,
  },

  data: () => ({
    waterBill: 0,
    electricityBill: 0,
    internetBill: 0,
    money: moneyConfig,
  }),

  methods: {
    makeReport() {
      const { waterBill, electricityBill, internetBill } = this;
      this.$router.push({ name: "Report", params: { waterBill, electricityBill, internetBill } });
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
}
</style>
