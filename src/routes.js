import React from "react";
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
import Login from "./views/pages/login/Login";
import Logout from "./components/Logout";
import UserList from "./views/pages/userList/Userlist";
import ChangePassword from "./views/pages/ChangePassword/changePassword";
import GameList from "./views/pages/GameList/gameList";
import Profile from "./views/pages/Profile/profile";
import AdminLogin from "./views/pages/admin/login/Login";
import AdminVendorList from "./views/pages/admin/vendorList/vendorList";
import AdminUserList from "./views/pages/admin/userList/Userlist";
import AdminGameList from "./views/pages/admin/GameList/gameList";
import AdminEditGameList from "./views/pages/admin/EditGameList/editGameList";
import AdminCreateVendor from "./views/pages/admin/CreateVendor/createVendor";

const routes = [
  { path: "/login", name: "Login", element: <Login /> },
  { path: "/logout", name: "Logout", element: <Logout /> },
  {
    path: "/userlist",
    name: "User List",
    element: (
      <DefaultLayout>
        <UserList />
      </DefaultLayout>
    ),
  },
  // {
  //   path: "/changepassword",
  //   name: "Change Password",
  //   element: (
  //     <DefaultLayout>
  //       <ChangePassword />
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/gamelist",
  //   name: "Game List",
  //   element: (
  //     <DefaultLayout>
  //       <GameList></GameList>
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/profilesetting",
  //   name: "Profile Setting",
  //   element: (
  //     <DefaultLayout>
  //       <Profile></Profile>
  //     </DefaultLayout>
  //   ),
  // },
  { path: "/admin/login", name: "admin Login", element: <AdminLogin /> },
  // {
  //   path: "/admin/vendorlist",
  //   name: "Vendor List",
  //   element: (
  //     <DefaultLayout>
  //       <AdminVendorList />
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/admin/userlist/:id",
  //   name: "User List",
  //   element: (
  //     <DefaultLayout>
  //       <AdminUserList />
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/admin/gamelist",
  //   name: "Game List",
  //   element: (
  //     <DefaultLayout>
  //       <AdminGameList />
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/admin/editGameList/:id",
  //   name: "Edit Game List",
  //   element: (
  //     <DefaultLayout>
  //       <AdminEditGameList />
  //     </DefaultLayout>
  //   ),
  // },
  // {
  //   path: "/admin/createvendor",
  //   name: "Vendor Registration",
  //   element: (
  //     <DefaultLayout>
  //       <AdminCreateVendor />
  //     </DefaultLayout>
  //   ),
  // },
];

export default routes;
