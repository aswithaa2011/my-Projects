import { Navigate } from "react-router-dom";

const ProtectedContext = ({ children }) => {
  const isAuth = localStorage.getItem("auth");
  const changeAuth = isAuth ? JSON.parse(isAuth) : { status: false };

  if (changeAuth.status !== true) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedContext;
