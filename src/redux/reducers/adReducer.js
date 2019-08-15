const initialState = {
  ad_name: "",
  drinks: []
};

const UPDATE_AD_NAME = "UPDATE_AD_NAME";
const DESTROY_AD = "DESTROP_AD";
const ADD_DRINK = "ADD_DRINK";
const REMOVE_DRINK = "REMOVE_DRINK";

export function addDrink(drinkName, drinkPrice, ingredients, image) {
  return {
    type: ADD_DRINK,
    payload: { drinkName, drinkPrice, ingredients, image }
  };
}

export function removeDrink(index) {
  console.log("hello");
  return {
    type: REMOVE_DRINK,
    payload: index
  };
}

export function updateAdName(name) {
  return {
    type: UPDATE_AD_NAME,
    payload: name
  };
}
export function clearAdReducer() {
  return {
    type: DESTROY_AD,
    payload: initialState
  };
}

export function adReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AD_NAME:
      return {
        ...state,
        ad_name: action.payload
      };

    case ADD_DRINK:
      return {
        ...state,
        drinks: [...state.drinks, action.payload]
      };
    case DESTROY_AD:
      return {
        ...action.payload
      };

    case REMOVE_DRINK:
      state.drinks.splice(action.payload, 1);
      return {
        ...state,
        drinks: state.drinks
      };

    default:
      return state;
  }
}
