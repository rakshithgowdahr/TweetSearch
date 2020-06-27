import React from "react";

const Header = props => {
  return (
    <div
      style={{ paddingBottom: "1.5rem" }}
      className="d-flex justify-content-center"
    >
      <h3 style={{ padding: "12px 0px" }} className="inner">
        <b>TWEET</b>
      </h3>
      <img className="inner size" src={props.image} alt="" />
      <h3 style={{ padding: "12px 0px" }} className="inner">
        <b>SEARCH</b>
      </h3>
    </div>
  );
};

export default Header;
