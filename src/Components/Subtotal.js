import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }, _] = useStateValue();
  var total = 0;
  for (let i = 0; i < basket.length; i++) {
    total += basket[i].price;
  }

  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
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
        className="checkout-button"
        onClick={(e) => history.push("/payment")}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
