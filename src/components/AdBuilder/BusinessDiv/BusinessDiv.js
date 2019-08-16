import React from "react";
import "./BusinessDiv.scss";

export default function BusinessDiv(props) {
  let {
    business_name,
    first_name,
    last_name,
    phone,
    email,
    address,
    suite,
    state,
    city,
    zip,
    description
  } = props.business;

  return (
    <div className={"bizDiv"}>
      <h1>{business_name}</h1>
      <p>
        {address}, {suite && suite}
      </p>
      <p>
        {city}, {state} {zip}
      </p>
      <h5>Contact</h5>
      <p>{phone}</p>
      <p>{email}</p>
      <p>
        Manager: {first_name} {last_name}
      </p>

      <div className={"busDescriptionDiv"}>
        <p>{description}</p>
      </div>
    </div>
  );
}
