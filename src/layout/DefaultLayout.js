import React from "react";
import { AppSidebar, AppHeader } from "../components/index";

const DefaultLayout = (props) => {
  console.log("default layo");
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3 d-flex flex-column">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
