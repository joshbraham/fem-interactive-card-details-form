import { useState } from "react";

export default function useForm(...fields) {
  const [values, setValues] = useState(
    fields.reduce((state, field) => {
      return { ...state, [field]: "" };
    }, {})
  );

  const handleChange = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  return { ...values, handleChange };
}
