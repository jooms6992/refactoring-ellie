class Statement {
  #invoice;
  #plays;
  constructor(invoice, plays) {
    this.#invoice = invoice;
    this.#plays = plays;
  }
}

class CalculateAmount {
  #totalAmount = 0;
}

class CalculatePoints {
  #volumeCredits = 0;
}

export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  function formatCurrency(currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(currency);
  }

  function calculateTragedyAmount(perf) {
    let thisAmount = 40000;
    return perf.audience > 30
      ? (thisAmount += 1000 * (perf.audience - 30))
      : thisAmount;
  }

  function calculateComedyAmount(perf) {
    let thisAmount = 30000;
    thisAmount += 300 * perf.audience;
    return perf.audience > 20
      ? (thisAmount += 10000 + 500 * (perf.audience - 20))
      : thisAmount;
  }

  function earnPoints(perf, play) {
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  }

  function printInvoiceOfPlay(perf, play, thisAmount) {
    result += `  ${play.name}: ${formatCurrency(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  function calculatePlayAmount(playType, perf) {
    switch (playType) {
      case 'tragedy': // 비극
        return calculateTragedyAmount(perf);
      case 'comedy': // 희극
        return calculateComedyAmount(perf);
      default:
        throw new Error(`알 수 없는 장르: ${playType}`);
    }
  }

  // 연극의 장르에 따른 청구비용
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    thisAmount = calculatePlayAmount(play.type, perf);
    earnPoints(perf, play);
    printInvoiceOfPlay(perf, play, thisAmount);
  }

  result += `총액: ${formatCurrency(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);
