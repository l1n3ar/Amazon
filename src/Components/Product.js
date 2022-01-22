import React from "react";
import { useStateValue } from "../StateProvider";
import "./Product.css";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  function addToBasket() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  }

  return (
    <div className="product">
      <div className="product-info">
        <p className="product-title">{title}</p>
        <div className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="Product" className="product-image" />

      <button className="product-button" onClick={addToBasket}>
        Add To Basket
      </button>
    </div>
  );
}

export default Product;
