import { Route } from "react-router-dom";
import { lazy } from "react";

const AuthLayout = lazy(() => import("../app/dashboard/__layout"));
const IndexPage = lazy(() => import("../app/dashboard"));
const Conditions = lazy(() => import("../app/dashboard/conditions"));
const All = lazy(() => import("../app/dashboard/all"));
const PostHerb = lazy(() => import("../app/dashboard/postherb"));
const HerbDetail = lazy(() => import("../app/dashboard/herb"));
const AddPage = lazy(() => import("../app/dashboard/add"));
const ChangePass = lazy(() => import("../app/dashboard/changePass"));

const AppRoutes = () => {
  return (
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<IndexPage />} />
      <Route path="add" element={<AddPage />} />
      <Route path="all" element={<All />} />
      <Route path="pass" element={<ChangePass />} />
      <Route path="conditions" element={<Conditions />} />
      <Route path="herb/:id" element={<HerbDetail />} />
      <Route path="post" element={<PostHerb />} />
    </Route>
  );
};

export default AppRoutes;
