import axios from "axios";

const initialState = {
  id: 0,
  business_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  desciption: "",
  address: "",
  suite: "",
  city: "",
  state: "",
  zip: "",
  ad: [],
  error: "",
  pending: false
};

const UPDATE_USER = "UPDATE_USER";
const CREATE_USER = "CREATE_USER";
const DESTROY_USER = "DESTROY_USER";
const CHECK_FOR_LOGIN = "CHECK_FOR_LOGIN";

export function login(email, password) {
  console.log(email);
  return {
    type: CREATE_USER,
    payload: axios.post("/auth/login", { email, password }).then(res => {
      return res.data;
    })
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    payload: value
  };
}

export function clearAuthReducer() {
  return {
    type: DESTROY_USER,
    payload: initialState
  };
}

export function checkForLogin(value) {
  console.log("Hit:", value);
  return {
    type: CHECK_FOR_LOGIN,
    payload: value
  };
}

// Create Reducer

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case `${CREATE_USER}_FULFILLED`:
      return {
        ...action.payload,
        error: "",
        pending: false
      };
    case `${CREATE_USER}_REJECTED`:
      return {
        ...state,
        error: "Eamil or Password is incorrect!",
        pending: false
      };
    case `${CREATE_USER}_PENDING`:
      return { ...state, pending: true };

    case `${DESTROY_USER}`:
      return {
        ...action.payload
      };

    case `${UPDATE_USER}`:
      return { ...action.payload };

    case `CHECK_FOR_LOGIN`:
      console.log(action.payload);
      return { ...action.payload, error: "", pending: false };
    default:
      return state;
  }
}
