import React, { Component } from "react";
import "./Login.scss";
import Video from "../vid/video.mp4";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  login = e => {
    e.preventDefault();
    let { email, password } = this.state;
  };
  render() {
    console.log(this.state);

    return (
      <div className={"loginDiv"}>
        <video id="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />
        </video>
        <div class="overlay">
          <form onSubmit={this.login}>
            <label>
              Email:
              <input
                type="email"
                onChange={this.handleChange}
                name="email"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={this.handleChange}
                name="password"
                required
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
