import cardBack from "./assets/bg-card-back.png";
import cardFront from "./assets/bg-card-front.png";
import logo from "./assets/card-logo.svg";

export default function Cards({
  cardName,
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
}) {
  const formatName = (name) => {
    return name.length < 19 ? name : name.substring(0, 17) + "...";
  };

  return (
    <div className="Cards">
      <div className="card card-front">
        <img className="card-front__bg" src={cardFront} alt="Front of card." />
        <div className="card-front__items">
          <img className="card-logo" src={logo} alt="Card logo." />
          <p>{cardNumber || "0000 0000 0000 0000"}</p>
          <p className="card__name-exp">
            <span>{formatName(cardName) || "Jane Appleseed"}</span>
            <span>
              {expiryMonth || "00"}/{expiryYear || "00"}
            </span>
          </p>
        </div>
      </div>
      <div className="card card-back">
        <img className="card-back__bg" src={cardBack} alt="Back of card."></img>
        <div className="card-back__items">
          <p className="card__cvc">{cvc || "000"}</p>
        </div>
      </div>
    </div>
  );
}
