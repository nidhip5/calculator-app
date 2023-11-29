import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  const numClickHandler = (e) => {
    if (calc.num.length < 16) {
      e.preventDefault();
      const value = e.target.innerHtml;
      setCalc({
        ...calc,
        num:
          calc.num.value == 0 && value == "0"
            ? "0"
            : calc.num.value % 1 == 0
            ? Number(calc.num.value + value)
            : calc.num.value + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (calc.num) {
      setCalc({
        ...calc,
        num: !calc.num.toString.includes(".") ? calc.num + value : calc.num,
        // !cal.num.toString.includes(.) checks whether cal.num (converted to string) includes a decimal or not. if not then it will add current num value with exising value or else it will simply keep existing num value. meaning the comma button doesnt have any behavior.
      });
    }
  };
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.num && calc.res ? calc.num : calc.res, // if !cal.num is false and cal.res is present then show cal.num or else show cal.res
      num: 0,
    });
  };
  const equalsClickHandler = (e) => {
    e.preventDefault();
    if (calc.num && calc.sign) {
      const math = (a, b, sign) => {
        sign == "+" ? a + b : sign == "-" ? a - b : sign == "X" ? a * b : a / b;
      };
      setCalc({
        ...cal,
        num: "0", //The num property is set to 0, potentially indicating that the user is starting a new number entry after the calculation.
        sign: "", // The sign property is set to an empty string, indicating that the previous operator has been used for calculation.
        res:
          calc.num == 0 && calc.sign == "/"
            ? "Can't divide by 0"
            : math(Number(calc.num), Number(calc.res), calc.sign),
      });
    }
  };
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : calc.num,
      res: calc.res ? calc.res * -1 : calc.res,
      sign: "",
    });
  };
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      res: 0,
      num: 0,
      sign: "",
    });
  };
  const percentageClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
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
        {btnValues.flat().map((btn, index) => {
          return (
            <Button
              className={btn === "=" ? "equals" : ""}
              value={btn}
              key={index}
              onClick={
                btn == "C"
                  ? resetClickHandler
                  : btn == "%"
                  ? percentageClickHandler
                  : btn == "/" || btn == "+" || btn == "-" || btn == "X"
                  ? signClickHandler
                  : btn == "="
                  ? equalsClickHandler
                  : btn == "."
                  ? commaClickHandler
                  : btn == "+-"
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
