import axios from "axios";

const initialState = {
  drinks: [],
  filterDrinks: [],
  loading: false
};

const FETCH_DRINKS = "FETCH_DRINKS";
const FETCH_MIX = "FETCH_MIX";
const UPDATE_DRINKS = "UPDATE_DRINKS";

//Action Creator

export function getMix() {
  return {
    type: FETCH_MIX,
    payload: axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
      )
      .then(res => {
        return res.data.drinks;
      })
  };
}

export function getDrinks(alcohol) {
  return {
    type: FETCH_DRINKS,
    payload: axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`
      )
      .then(res => {
        return res.data.drinks;
      })
  };
}

export function updateDrinks(drinks) {
  return {
    type: UPDATE_DRINKS,
    payload: drinks
  };
}

//Reducer Function
export function drinkReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case `${FETCH_MIX}_PENDING`:
      return { ...state, loading: true };
    case `${FETCH_MIX}_FULFILLED`:
      console.log("check");
      return {
        ...state,
        loading: false,
        drinks: payload,
        filterDrinks: payload
      };
    case `${UPDATE_DRINKS}`:
      return { ...state, filterDrinks: payload };
    case `${FETCH_DRINKS}_PENDING`:
      return { ...state, loading: true };
    case `${FETCH_DRINKS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        drinks: payload,
        filterDrinks: payload
      };

    default:
      return state;
  }
}
