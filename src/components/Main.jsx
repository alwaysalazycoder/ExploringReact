import React, { useState } from "react";
import Nav from "./Nav";

const Main = () => {
  const [disable, setDisable] = useState(false);
  const handleClick = () => {
    console.log("yo");
    alert("working");
    setDisable(true);
  };
  const handleClick2 = () => {
    alert("Working");
  };
  return (
    <>
      <Nav />
      <h2>Main</h2>
      <div className="wrapper">

        <button className="button-1 " onClick={() => handleClick()}>
          Click Me{" "}
        </button>

        <button
          className="button-1"
          disabled={disable}
          onClick={() => handleClick2()}
        >
          {disable===true ? "YOu cannot click me" : "You can click me"}
        </button>
      </div>
    </>
  );
};

export default Main;
