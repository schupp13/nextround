const initialState = {
  ad_name: "",
  dirnk_name: "",
  drink_price: "",
  drink_ingredients: [],
  drinks: []
};

const UPDATE_AD_NAME = "UPDATE_AD_NAME";
const UPDATE_DRINK_PRICE = "UPDATE_DRINK_PRICE";
const ADD_DRINK = "ADD_DRINK";

export function updateAdName(name) {
  return {
    type: `${UPDATE_AD_NAME}`,
    payload: name
  };
}

export function updateDrinkPrice() {}

export function addDrink() {}

export function adReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AD_NAME:
      return {
        ...state,
        ad_name: action.payload
      };
    default:
      return state;
  }
}
