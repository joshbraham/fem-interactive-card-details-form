import { motion } from "framer-motion";
import checkmark from "./assets/icon-complete.svg";

export default function FormSuccess({ handleContinue, transition }) {
  return (
    <motion.div className="FormSuccess" {...transition}>
      <img src={checkmark} alt="A checkmark" draggable={false} />
      <h2>Thank you!</h2>
      <p>We've added your card details</p>
      <button onClick={handleContinue}>Continue</button>
    </motion.div>
  );
}
