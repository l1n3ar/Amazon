export const initialState = {
  basket: [],
  user: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      let index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Item not found");
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      var index1;
      for (let i = 0; i < action.user.email.length; i++) {
        if (action.user.email[i] === "@") index1 = i;
      }

      const parsedString = action.user.email.substring(0, index1);

      return {
        ...state,
        user: parsedString,
      };

    default:
      return state;
  }
}
