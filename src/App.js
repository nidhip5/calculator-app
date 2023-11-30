import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  // a 2 dimensional array
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

// Essentially what it does is take a number, format it into the string format and create the space separators for the thousand mark.
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// If we reverse the process and want to process the string of numbers, first we need to remove the spaces, so we can later convert it to number. For that, you can use this function:
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString.includes(".") ? calc.num + value : calc.num,
      // !cal.num.toString.includes(.) checks whether cal.num (converted to string) includes a decimal or not. if not then it will add current num value with exising value or else it will simply keep existing num value. meaning the comma button doesnt have any behavior.
    });
  };
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res, // if !cal.num is false and cal.res is present then show cal.num or else show cal.res
      num: 0,
    });
  };
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      // since it is a single expression so we defined arrow function with no curly braces
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "", // The sign property is set to an empty string, indicating that the previous operator has been used for calculation.
        num: 0, //The num property is set to 0, potentially indicating that the user is starting a new number entry after the calculation.
      });
    }
  };
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num * -1)) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res * -1)) : 0,
      sign: "",
    });
  };
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  const percentageClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {/* to convert 2d array into single array we use flattened array that is flat() array */}
        {btnValues.flat().map((btn, index) => {
          return (
            <Button
              key={index}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "%"
                  ? percentageClickHandler
                  : btn === "/" || btn === "+" || btn === "-" || btn === "X"
                  ? signClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
