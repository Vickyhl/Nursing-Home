import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentReviewPage.css";
import axios from "axios";

const PaymentReviewPage = () => {
  const [ssn, setSsn] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [recipientExists, setRecipientExists] = useState(false);

  const handleSsnChange = (event) => {
    setSsn(event.target.value);
  };

  const handleAgreementChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handlePaymentCommit = async () => {
    const stripe = await loadStripe(
      "pk_test_51NOj7NKhzveWmsHn4CgjACBo8NTwhSmeU4fIdhFSvR16oSX37QV4IbGyZcUncgGs1QWUaY1DcGCkq6Ouz0mBKXnC00OEL5hW87"
    );
    if (agreed) {
      if (recipientExists) {
        // Perform the payment commit logic here
        stripe.redirectToCheckout({
          lineItems: [
            {
              // Define the product and price in the Dashboard first, and use the price
              // ID in your client-side code.
              price: "price_1NPNLGKhzveWmsHnDRS321tt",
              quantity: 1,
            },
          ],
          mode: "payment",
          //redirect to the last created menu
          successUrl: `http://localhost:3000/`,
          cancelUrl: "http://localhost:3000/",
        });
      } else {
        alert("Recipient does not exist. Please enter a valid SSN.");
      }
    } else {
      alert("Please agree to the terms before committing the payment.");
    }
  };

  const checkRecipientExistence = async () => {
    console.log(ssn);
    const result = await axios.get(
      "http://localhost:5000/api/users/getUserBySsn",
      {
        params: {
          ssn: ssn,
        },
      }
    );
    // console.log(result.data.exists);
    setRecipientExists(result.data.exists);
  };

  return (
    <>
      <div className="payment-class">
        <h2 className="payment-header">Review Payment Details</h2>
        <p>Please review the following payment details before proceeding:</p>

        <div>
          <strong>Payment Amount (for a month):</strong> $1000
        </div>

        <div>
          <label htmlFor="ssnInput">
            <strong>Recipient SSN:</strong>
          </label>
          <input
            type="text"
            id="ssnInput"
            className="payment-input"
            value={ssn}
            onChange={handleSsnChange}
            onBlur={checkRecipientExistence}
          />
        </div>

        <div className="payment-method">
          <strong>Payment Method:</strong> Credit Card
        </div>

        <div>
          <input
            type="checkbox"
            id="agreementCheckbox"
            checked={agreed}
            onChange={handleAgreementChange}
          />
          <label htmlFor="agreementCheckbox">
            I agree to commit the payment according to the provided details.
          </label>
        </div>

        <button
          className="btn-container"
          onClick={handlePaymentCommit}
          disabled={!agreed}
        >
          Commit Payment
        </button>
      </div>
    </>
  );
};

export default PaymentReviewPage;
