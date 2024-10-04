import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const { token } = useSelector((state) => state.user);

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
