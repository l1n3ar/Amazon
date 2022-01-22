import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import Basket from "./Basket";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";

function Checkout() {
  const [{ basket }, _] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Checkout Ad"
          className="checkout-ad"
        />

        <h2 className="checkout-title">Your Shopping Basket</h2>
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
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
