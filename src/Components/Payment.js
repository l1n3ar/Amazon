import { ListItem } from "@mui/material";
import React from "react";
import { auth } from "../Firebase";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Product from "./Product";
import { Link, useHistory } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const currentUser = auth.currentUser;
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

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
            <h3>Payment Title</h3>
          </div>
          <div className="payment-details">
            <h3>Payment details</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
