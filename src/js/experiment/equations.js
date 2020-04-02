function getEquationVals(count) {
  let equation = "";
  for (let i = 0; i < count; i++) {
    // conditionally append "+" operator
    equation += getRandomInt(10, 99) + " + ";
  }
  return equation;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateEquation(currentLevel) {
  let level = currentLevel || 1;
  // let trial = 1;
  // let TwoDigitRange = getRandomInt(10, 99);
  let isEven = level % 2 === 0;
  let OneDigitRange = getRandomInt(1, 9);
  let TwoDigitRangeQuantity = Math.floor(level / 2) + 1;
  let OneDigitRangeQuantity = isEven ? 0 : OneDigitRange;
  let equationEven = getEquationVals(TwoDigitRangeQuantity);
  // we are going to add the onedigitnumber to the end of the equation if odd level
  let equation = isEven ? equationEven : equationEven + OneDigitRangeQuantity;

  // console.log('================')
  // console.log(equation)
  // console.log('level:', level)
  return equation.replace(/\+\s*$/, "");
}
