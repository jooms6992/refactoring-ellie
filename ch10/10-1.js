function calculateCharge(date, quantity, plan) {
  return isSummer() ? summerCharge() : regularCharge();

  function isSummer() {
    return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
  }

  function summerCharge() {
    return quantity * plan.summerRate;
  }

  function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
  }
}

class Charge {
  #date;
  #quantity;
  #plan;
  constructor(date, quantity, plan) {
    this.#date = date;
    this.#quantity = quantity;
    this.#plan = plan;
  }

  get isSummer() {
    return (
      !this.#date.isBefore(this.#plan.summerStart) &&
      !this.#date.isAfter(this.#plan.summerEnd)
    );
  }

  get base() {
    return this.isSummer() ? this.summer() : this.reguler();
  }

  get summer() {
    return this.#quantity * this.#plan.summerRate;
  }

  get regular() {
    return (
      this.#quantity * this.#plan.regularRate + this.#plan.regularServiceCharge
    );
  }
}
