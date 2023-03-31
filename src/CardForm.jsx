import React from "react";

export default function CardForm({
  cardName,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
  handleChange,
  handleNumberChange,
  handleCardNumberChange,
  handleSubmit,
  errors,
  refs,
}) {
  return (
    <div className="Card-form">
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form__name">
          <label htmlFor="name">Cardholder name</label>
          <br />
          <input
            ref={refs.cardNameRef}
            id="name"
            type="text"
            placeholder="e.g. Jane Appleseed"
            name="cardName"
            value={cardName}
            onChange={handleChange}
          />
          {errors.cardName && <p className="invalid-msg">{errors.cardName}</p>}
        </div>
        {/* Number */}
        <div className="form__number">
          <label htmlFor="number">Card number</label>
          <br />
          <input
            ref={refs.cardNumberRef}
            id="number"
            type="text"
            value={cardNumber}
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength="19"
            onChange={handleCardNumberChange}
          />
          {errors.cardNumber && (
            <p className="invalid-msg">{errors.cardNumber}</p>
          )}
        </div>
        {/* Expiry Date */}
        <div className="form__exp">
          <label>Exp. date (MM/YY)</label>
          <br />
          <input
            ref={refs.expiryMonthRef}
            id="exp-m"
            type="text"
            maxLength="2"
            placeholder="MM"
            name="expiryMonth"
            value={expiryMonth}
            onChange={handleNumberChange}
          />
          <input
            ref={refs.expiryYearRef}
            id="exp-y"
            type="text"
            maxLength="2"
            placeholder="YY"
            name="expiryYear"
            value={expiryYear}
            onChange={handleNumberChange}
          />
          {(errors.expiryMonth || errors.expiryYear) && (
            <p className="invalid-msg">
              {errors.expiryMonth || errors.expiryYear}
            </p>
          )}
        </div>
        {/* CVC */}
        <div className="form__cvc">
          <label htmlFor="cvc">CVC</label>
          <br />
          <input
            ref={refs.cvcRef}
            id="cvc"
            type="text"
            placeholder="e.g. 123"
            maxLength="3"
            name="cvc"
            value={cvc}
            onChange={handleNumberChange}
          />
          {errors.cvc && <p className="invalid-msg">{errors.cvc}</p>}
        </div>
        {/* Submit */}
        <input className="form__submit" type="submit" value="Confirm" />
      </form>
    </div>
  );
}
