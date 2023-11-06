import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilAccountLogout,
  cilList,
  cilSettings,
  cilKeyboard,
  cilGamepad,
  cilInstitution,
  cilNewspaper,
  cilAddressBook,
} from "@coreui/icons";
import { CNavItem, CNavGroup } from "@coreui/react";
import fetchUserData from "./utils/userSavedData";
const userRole = fetchUserData().role;
const _nav = [
  {
    component: CNavItem,
    name: "",
    to: "",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    badge: {
      color: "info",
    },
  },
  // {
  //   component: CNavGroup,
  //   name: 'Settings',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Profile Setting',
  //       to: '/profilesetting',
  //       icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Change Password',
  //       to: '/changepassword',
  //       icon: <CIcon icon={cilKeyboard} customClassName="nav-icon" />,
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: "Thana List",
    to: "/userList",
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    badge: {
      color: "info",
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Vendor Registration',
  //   to: '/admin/createvendor',
  //   icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },

  // },
  {
    component: CNavItem,
    name: "Logout",
    to: "/logout",
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: "info",
    },
  },
];
if (userRole == "vendor") {
  _nav[0].name = "User List";
  _nav[0].to = "/userlist";
  _nav.splice(3, 1);
} else if (userRole == "admin") {
  _nav[0].name = "Vendor List";
  _nav[0].to = "/admin/vendorlist";
  _nav[1].items.splice(0, 1);
  _nav[2].to = "/admin/gamelist";
}

export default _nav;
