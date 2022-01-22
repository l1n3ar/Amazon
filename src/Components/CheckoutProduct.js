import React from "react";
import { useStateValue } from "../StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  console.log(basket);

  function truncate(str) {
    return str.length > 80 ? str.substring(0, 70) + "..." : str;
  }

  function removeFromBasket() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  }

  return (
    <div className="checkoutProduct">
      <img
        src={image}
        alt="checkout-product-image"
        className="checkout-product-image"
      />
      <div className="product-info">
        <p className="checkout-product-title">{truncate(title)}</p>

        <p className="checkout-product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product-rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
        <button className="remove-from-basket" onClick={removeFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
