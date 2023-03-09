import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const { user, roles } = useSelector((state) => state.auth);

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace={true} />
  );
};

export default RequiredAuth;
