//
// Este modulo contem instancia de formatadores de numeros.
// Ele tem objetos já instanciados e funcoes para intaciacao de novos objetos.
// Segundo a mozilla, para grande quantidade de formatações é melhor usar instância já criadas.
// Ou seja, ao usar uma função que instancia objetos, reaproveite esse objeto para melhor desempenho.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString#performance
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
//

const percentIntlNumFormat = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
});

const decimalIntlNumFormat = new Intl.NumberFormat("pt-BR", { style: "decimal" });

const currencyIntlNumFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const percentIntlNumFormat8 = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 8,
});

const decimalIntlNumFormat8 = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  minimumFractionDigits: 8,
});

function newPercentWithFractionDigits(fractionDigits) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
  });
}

function newDecimalWithFractionDigits(fractionDigits) {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: fractionDigits,
  });
}

export default {
  percent: percentIntlNumFormat.format,
  decimal: decimalIntlNumFormat.format,
  percent8: percentIntlNumFormat8.format,
  decimal8: decimalIntlNumFormat8.format,
  currency: currencyIntlNumFormat.format,
  newPercentWithFractionDigits,
  newDecimalWithFractionDigits,
};
