import React from "react";

function BusinessNav(props) {
  <nav className={"navbar"}>
    <div>
      <h1>MusingMe</h1>
    </div>
    <div className={"hamburger"} onClick={this.handleClick}>
      <i class="material-icons">menu</i>
    </div>
    <div className={"menuDiv"}>
      <Link to={"/businessDash"}>
        <button>{props.business_name} Dashboard</button>
      </Link>
    </div>

    {/* mobile */}
    <div className={this.state.className}>
      <Link to={"/businessDash"}>
        <button onClick={this.handleClick}>Dashboard</button>
      </Link>

      <button
        onClick={() => {
          this.changeLogin();
          this.handleClick();
        }}
      >
        Login
      </button>
    </div>
  </nav>;
}

const mapStateToProps = reduxState => {
  return { business_name: reduxState.authReducer.business_name };
};

export default connect(mapStateToProps)(BusinessNav);
