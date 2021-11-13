import numberFormat from "@/services/utils/number-format";

function decimal(value) {
  return numberFormat.decimal(value);
}

function percent(value) {
  return numberFormat.percent(value);
}

function currency(value) {
  return numberFormat.currency(value);
}

export default {
  decimal,
  percent,
  currency,
};
