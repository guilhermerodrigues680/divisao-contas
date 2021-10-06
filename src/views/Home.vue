<template>
  <div class="home">
    <header>
      <div class="header-container">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M36 20H12V22H36V20Z" fill="#6c63ff" />
          <path d="M36 26H20V28H36V26Z" fill="#6c63ff" />
        </svg>
      </div>
    </header>

    <main>
      <section>
        <div class="app-section-container">
          <img class="banner" src="@/assets/img/undraw_Vault_re_s4my.svg" alt="Banner do site" />
          <h1>Bem vindo a plataforma de gestão de contas</h1>
          <h2>Tire aqui os relatórios dos custos mensais.</h2>

          <form @submit.prevent="">
            <label>
              Água
              <money v-model="price" v-bind="money" type="text" inputmode="numeric" />
            </label>

            <label>
              Luz
              <money v-bind="money" type="text" inputmode="numeric" />
            </label>

            <label>
              Internet
              <money v-bind="money" type="text" inputmode="numeric" />
            </label>

            <button>Gerar Relatório</button>
          </form>
        </div>
      </section>
    </main>

    <footer></footer>
  </div>
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
    price: 123.45,
    money: moneyConfig,
  }),
};
</script>

<style lang="scss">
body {
  background-color: #c4c4c4;
}
</style>

<style lang="scss" scoped>
header {
  height: 78px;
  background: #c4c4c4;

  .header-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0rem 1.5rem;
    height: 100%;
  }
}

.home {
  font-family: "Roboto";
  max-width: 400px;
  background-color: #ffffff;
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

footer {
  height: 150px;
}
</style>
