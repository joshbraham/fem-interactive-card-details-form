import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Attribution from "./Attribution";
import CardForm from "./CardForm";
import Cards from "./Cards";
import FormSuccess from "./FormSuccess";
import useForm from "./utils/useForm";
import { DIGITS, useNumberForm } from "./utils/useNumberForm";

import "./styles/globals.css";

function App() {
  const { cardName, handleChange } = useForm("cardName");
  const [cardNumber, setCardNumber] = useState("");
  const { expiryMonth, expiryYear, cvc, handleNumberChange } = useNumberForm(
    "expiryMonth",
    "expiryYear",
    "cvc"
  );

  const cardNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expiryMonthRef = useRef(null);
  const expiryYearRef = useRef(null);
  const cvcRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    cardName: null,
    cardNumber: null,
    expiryMonth: null,
    expiryYear: null,
    cvc: null,
  });

  const resetBorders = () => {
    cardNameRef.current.classList.remove("invalid-input");
    cardNumberRef.current.classList.remove("invalid-input");
    expiryMonthRef.current.classList.remove("invalid-input");
    expiryYearRef.current.classList.remove("invalid-input");
    cvcRef.current.classList.remove("invalid-input");
  };

  const handleCardNumberChange = ({ target }) => {
    const formattedValue = target.value
      .split("")
      .filter((char) => DIGITS.includes(char))
      .reduce((str, char, idx) => {
        return `${str}${idx > 0 && idx % 4 === 0 ? " " + char : char}`;
      }, "");
    setCardNumber(formattedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    resetBorders();

    const blankError = "Can't be blank.";
    let nameError, numberError, monthError, yearError, cvcError;

    // Name input
    if (!cardName) {
      nameError = blankError;
    }
    if (nameError) cardNameRef.current.classList.add("invalid-input");

    // Card number input
    if (!cardNumber) {
      numberError = blankError;
    } else if (cardNumber.length !== 19) {
      numberError = "Must be 16 digits.";
    }
    if (numberError) cardNumberRef.current.classList.add("invalid-input");

    // Expiry date input (one error at a time!)
    if (!expiryMonth) {
      monthError = blankError;
    } else if (expiryMonth.length !== 2) {
      monthError = "Must be 2 digits.";
    } else if (parseInt(expiryMonth) > 12) {
      monthError = "Invalid month. (01..12)";
    } else if (!expiryYear) {
      yearError = blankError;
    } else if (expiryYear.length !== 2) {
      yearError = "Must be 2 digits.";
    }
    if (monthError) expiryMonthRef.current.classList.add("invalid-input");
    if (yearError) expiryYearRef.current.classList.add("invalid-input");

    // CVC input
    if (!cvc) {
      cvcError = blankError;
    } else if (cvc.length !== 3) {
      cvcError = "Must be 3 digits.";
    }
    if (cvcError) cvcRef.current.classList.add("invalid-input");

    // Valid submission logic
    if (
      [nameError, numberError, monthError, yearError, cvcError].every(
        (error) => error == null
      )
    ) {
      setSubmitted(true);
    }

    setErrors({
      cardName: nameError,
      cardNumber: numberError,
      expiryMonth: monthError,
      expiryYear: yearError,
      cvc: cvcError,
    });
  };

  const handleContinue = () => {
    setSubmitted(false);
  };

  const refs = {
    cardNameRef,
    cardNumberRef,
    expiryMonthRef,
    expiryYearRef,
    cvcRef,
  };

  const cardProps = {
    cardName,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
  };

  const cardFormProps = {
    ...cardProps,
    handleCardNumberChange,
    handleNumberChange,
    handleChange,
    handleSubmit,
    refs,
    errors,
  };

  const transition = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <main className="grid-flow">
      <Cards {...cardProps} />
      <div className="form-wrapper">
        <AnimatePresence>
          {submitted ? (
            <FormSuccess
              handleContinue={handleContinue}
              transition={transition}
            />
          ) : (
            <CardForm {...cardFormProps} transition={transition} />
          )}
        </AnimatePresence>
      </div>
      <Attribution />
    </main>
  );
}

export default App;
