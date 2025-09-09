import React from "react";

const Connect = ({ onClick }) => {
  return (
    <div>
      <h1>Connect your vehicle</h1>

      <button onClick={onClick}>Connect</button>
    </div>
  );
};

export default Connect;
