import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import SimpleBar from "simplebar-react";
import portal from "../assets/brand/digital-india.png";
// import portal from "../assets/brand/portal.png";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarUnfoldable: unfoldable, sidebarShow } = useSelector(
    (state) => state
  );

  return (
    <CSidebar
      style={{ background: "#061b8f", color: "while" }}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        to="/admin/login"
        style={{ background: "#e32828", color: "while" }}
      >
        <img
          className="sidebar-brand-full"
          src={portal}
          style={{ height: "89px", width: "194px" }}
        />
        <CIcon className="sidebar-brand-narrow" icon={portal} height={200} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
