import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSession } from "./hooks/useSession";
import Loader from "./Loader";

export default function AuthRouter({ children }) {
  const navigate = useNavigate();
  const { session } = useSession();
  const { data, isError, isLoading } = session;

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    navigate("/login");
    return null;
  }

  return children;
}

AuthRouter.propTypes = {
  children: propTypes.node,
};
