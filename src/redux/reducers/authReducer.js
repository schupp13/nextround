import axios from "axios";

const initialState = {
  businessName: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  description: "",
  address: "",
  suite: "",
  city: "",
  state: "",
  zip: "",
  ad: []
};

const CREATE_USER = "CREATE_USER";

export function login(email, password) {
  return {
    type: CREATE_USER,
    payload: axios.post("/auth/login", { email, password }).then(res => {
      console.log("createUser");
      return res.data;
    })
  };
}

// Create Reducer

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case `${CREATE_USER}_FULFILLED`:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
