import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import fetchUserData from "../utils/userSavedData";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state);
  const userRole = fetchUserData().role;
  const urlNavTitle = {
    userVendorList: {
      name: "",
      to: "",
    },

    gameList: {
      to: "",
    },
  };
  if (userRole == "vendor") {
    urlNavTitle.userVendorList.name = "User List";
    urlNavTitle.userVendorList.to = "/userlist";
    urlNavTitle.gameList.to = "/gamelist";
  } else if (userRole == "admin") {
    urlNavTitle.userVendorList.name = "Vendor List";
    urlNavTitle.userVendorList.to = "/admin/vendorlist";
    urlNavTitle.gameList.to = "/admin/gamelist";
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/changepassword" component={NavLink}>
              /
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to={urlNavTitle.userVendorList.to} component={NavLink}>
              {urlNavTitle.userVendorList.name}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to={urlNavTitle.gameList.to} component={NavLink}>
              Thana List
            </CNavLink>
          </CNavItem>
          {userRole === "vendor" && (
            <CNavItem>
              <CNavLink to="/profilesetting" component={NavLink}>
                Profile Setting
              </CNavLink>
            </CNavItem>
          )}
          {userRole === "admin" && (
            <CNavItem>
              <CNavLink to="/admin/createvendor" component={NavLink}>
                Vendor Registration
              </CNavLink>
            </CNavItem>
          )}
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>{/* <AppBreadcrumb /> */}</CContainer>
    </CHeader>
  );
};

export default AppHeader;
