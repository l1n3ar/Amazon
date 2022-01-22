import React from "react";
import { useStateValue } from "../StateProvider";
import Product from "./Product";

function Basket() {
  const [{ basket }, _] = useStateValue;

  return (
    <div className="basket">
      {basket.map((item) => (
        <Product
          title={item.title}
          id={item.id}
          price={item.price}
          rating={item.rating}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default Basket;
