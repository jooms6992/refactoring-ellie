export class Employee {
  // 캡슐화 해두고
  private constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
  }

  // 팩토리 함수를 만들어
  static createEngineer(name) {
    return new Employee(name, 'E')
  }

  static createSeniorEngineer(name) {
    return new Employee(name, 'SE')
  }
  static createMarketer(name) {
    return new Employee(name, 'M')
  }
}

const employee = new Employee.createEngineer('엘리')