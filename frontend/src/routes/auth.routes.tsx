import { Navigate, Route } from "react-router-dom";
import { lazy } from "react";

const DashboardLayout = lazy(() => import("../app/auth/__layout"));
const IndexPage = lazy(() => import("../app/auth"));


const AuthRoutes = () => {
  return (
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<IndexPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  );
};

export default AuthRoutes;
