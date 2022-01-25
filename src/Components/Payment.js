import { ListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Product from "./Product";
import { Link, useHistory } from "react-router-dom";
import "./Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "axios";

function Payment() {
  const currentUser = auth.currentUser;
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [client, setClient] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(event) {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(client, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ ...paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("/orders");
      });
  }

  function handleChange(event) {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  var total = 0;
  basket.map((item) => {
    total += item.price;
  });

  useEffect(() => {
    async function getClient() {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });
      setClient(response.data.client);
    }
    getClient();
  }, [basket]);

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout ( <Link to="/checkout"> {basket?.length} items </Link> )
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Details</h3>
          </div>
          <div className="payment-address">
            <p>
              <strong>{currentUser.email}</strong>
            </p>
            <p>221B Baker Street</p>
            <p>London, England</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Items</h3>
          </div>

          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                title={item.title}
                id={item.id}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        <strong>Order Total : </strong>
                        <strong>{value}</strong>
                      </p>
                      <small className="subtotal-gift">
                        <input type="checkbox" /> This order contains a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  className="payment"
                  type="submit"
                  disabled={disabled || succeeded || processing}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
