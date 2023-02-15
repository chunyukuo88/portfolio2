class Calculator{
  name = 'Calculator';
  getType() {
    return this.name;
  }
  add = (num1, num2) => num1+num2;
  subtract = (num1, num2) => num1-num2;
  multiply = (num1, num2) => num1*num2;
  divide = (num1, num2) => (num2 === 0) ? NaN : num1/num2;
  calculate(aFunction) {
    return new Promise((res, rej) => {
      if(isNaN(aFunction)) rej(NaN);
      else res(aFunction);
    });
  }
}

