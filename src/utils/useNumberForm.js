import { useState } from "react";

export const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function useNumberForm(...fields) {
  const [values, setValues] = useState(
    fields.reduce((state, field) => {
      return { ...state, [field]: "" };
    }, {})
  );

  const handleNumberChange = ({ target }) => {
    const formattedValue = target.value
      .split("")
      .filter((char) => DIGITS.includes(char))
      .join("");
    setValues((current) => ({ ...current, [target.name]: formattedValue }));
  };

  return { ...values, handleNumberChange };
}
