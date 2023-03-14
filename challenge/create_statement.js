class Performance {
  #audience;
  #play;
  constructor(audience, play) {
    this.#audience = audience;
    this.#play = play;
  }

  get play() {
    return this.#play;
  }

  get audience() {
    return this.#audience;
  }

  static create(audience, play) {
    switch (play.type) {
      case 'tragedy':
        return new Tragedy(audience, play);
      case 'comedy':
        return new Comedy(audience, play);
      default:
        throw new Error(`알 수 없는 타입:${play.type}`);
    }
  }
}

class Tragedy extends Performance {
  get amount() {
    let result = 40000;
    if (this.audience > 30) {
      result += 1000 * (this.audience - 30);
    }
    return result;
  }

  get credits() {
    return Math.max(this.audience - 30, 0);
  }
}
class Comedy extends Performance {
  get amount() {
    let result = 30000;
    if (this.audience > 20) {
      result += 10000 + 500 * (this.audience - 20);
    }
    result += 300 * this.audience;
    return result;
  }

  get credits() {
    return Math.max(this.audience - 30, 0) + Math.floor(this.audience / 5);
  }
}

export function createStatement(invoice, plays) {
  const statement = {};
  statement.customer = invoice.customer;
  statement.performances = invoice.performances.map((p) =>
    Performance.create(p.audience, plays[p.playID])
  );
  statement.totalAmount = totalAmount(statement.performances);
  statement.totalCredits = totalCredits(statement.performances);
  return statement;

  function totalAmount(performances) {
    return performances.reduce((sum, p) => (sum += p.amount), 0);
  }

  function totalCredits(performances) {
    return performances.reduce((sum, p) => (sum += p.credits), 0);
  }
}
