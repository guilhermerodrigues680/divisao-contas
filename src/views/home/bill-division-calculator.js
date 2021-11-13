/**
 * Calcula a divisão das contas. No caso a valor a pagar de cada pessoa
 * @param {Array<Object>} bills
 */
function calcDivisionOfBills(bills) {
  // const bill = {
  //   name: "Conta de Água",
  //   cost: 100.01,
  //   formOfDivision: { "uuid-0": 0.7, "uuid-1": 0.3 },
  //   payer: "uuid-1",
  // };
  // const resultBill = {
  //   totalEachPayer: {
  //     "uuid-0": 50.12,
  //     "uuid-1": 50.12,
  //   },
  //   formOfpayment: {
  //     "uuid-0": {
  //       from: "uuid-0",
  //       to: "uuid-1",
  //       total: 50.12,
  //     }, // uuid-0 -> uuid-1
  //   },
  //   payer: "uuid-0",
  //   total: 100.24,
  // };

  const resBills = [];
  for (const bill of bills) {
    const resultBill = {
      bill,
      payer: bill.payer,
      total: bill.cost,
      totalEachPayer: {},
      formOfpayment: {},
    };

    // Calcula o total a pagar para cada pagante
    // Garantia que a forma de divisao é 100% === 1
    for (const payer in bill.formOfDivision) {
      if (Object.hasOwnProperty.call(bill.formOfDivision, payer)) {
        const percent = bill.formOfDivision[payer];
        resultBill.totalEachPayer[payer] = percent * bill.cost;
      }
    }

    // Calcula quem deve pagar quem
    for (const payer in resultBill.totalEachPayer) {
      if (payer === bill.payer) {
        continue;
      }

      if (Object.hasOwnProperty.call(resultBill.totalEachPayer, payer)) {
        const totalPayer = resultBill.totalEachPayer[payer];
        const formOfpayment = {
          from: payer,
          to: bill.payer,
          total: totalPayer,
        };
        resultBill.formOfpayment[payer] = formOfpayment;
      }
    }

    resBills.push(resultBill);
  }

  return resBills;
}

/**
 * Calcula o total que cada pessoa deve pagar para a outra.
 * @param {Array<Object>} bills
 */
function calcOnlyTotal(billDivisionResults) {
  const totalFinal = {};
  for (const billDivisionRes of billDivisionResults) {
    for (const payer in billDivisionRes.formOfpayment) {
      if (Object.hasOwnProperty.call(billDivisionRes.formOfpayment, payer)) {
        const { to, total } = billDivisionRes.formOfpayment[payer];
        if (!Object.hasOwnProperty.call(totalFinal, payer)) {
          totalFinal[payer] = {};
        }

        if (!Object.hasOwnProperty.call(totalFinal[payer], to)) {
          totalFinal[payer][to] = 0;
        }

        totalFinal[payer][to] = totalFinal[payer][to] + total;
      }
    }
  }
  return totalFinal;
}

export default {
  calcDivisionOfBills,
  calcOnlyTotal,
};
