"use strict";

// Setup Mocha and Chai
mocha.setup( "bdd" );
const expect = chai.expect;

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

function AsBusinessCalculator(Calculator){
  return class BusinessCalculator extends Calculator{
    //
  }
}

describe( "AsBusinessCalculator", () => {
  const p = 100; // $100 in principle
  const t = 7;   // 7 years
  let BusinessCalculator, bizCalculator;

  beforeEach(() => {
    BusinessCalculator = AsBusinessCalculator( Calculator );
    bizCalculator = new BusinessCalculator();
  });

  it( "should be a function", function(){
    expect( AsBusinessCalculator ).to.be.a( "function" );
  });
});