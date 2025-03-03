import React from "react";
import { Outlet } from "react-router";
import { DockNavigation } from "../components/magicui/dock";
const Root = () => {
  return (
    <div>
      <header className="">
        <DockNavigation>
          
        </DockNavigation>
      </header>

      <Outlet></Outlet>
    </div>
  );
};

export default Root;
