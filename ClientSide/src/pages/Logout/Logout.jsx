import React from "react";
import Home from "../Home/Home";
import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    // Display an alert when the component mounts
    alert("You have been logged out!");
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
}

export default Logout;
