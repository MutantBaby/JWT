import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../components/Home";
import Admin from "../components/Admin";
import Links from "../components/Links";
import Login from "../pages/login/Login";
import Lounge from "../components/Lounge";
import Editor from "../components/Editor";
import Missing from "../components/Missing";
import Signup from "../pages/signup/Signup";
import RequiredAuth from "../components/RequiredAuth";
import Unauthorized from "../components/Unauthorized";
import PersistLogin from "../components/PersistLogin";
import TempDataLayout from "../layouts/TempDataLayout";

import { Layout } from "../layouts/Layout";
import TempData, { tempDataLoader } from "../components/TempData";

const ROLES = {
  User: "2001",
  Admin: "2003",
  Editor: "2002",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="auth" element={<Login />} />
        <Route path="linkage" element={<Links />} />
        <Route path="register" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
            <Route index path="/" element={<Home />} />
          </Route>

          <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route
            element={
              <RequiredAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
            }>
            <Route path="lounge" element={<Lounge />} />
          </Route>

          <Route path="temp" element={<TempDataLayout />}>
            <Route index element={<TempData />} loader={tempDataLoader} />
          </Route>
        </Route>

        {/* Catch All Errors */}
        <Route path="*" element={<Missing />} />
      </Route>
    </React.Fragment>
  )
);

export default router;
