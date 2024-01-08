import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  console.log(localStorage.getItem("username"));
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;