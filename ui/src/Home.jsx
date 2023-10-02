import { useNavigate } from "react-router-dom";
import { useSessionValidator } from "./hooks/useSessionValidator";

export default function Home() {
  const { validateSession } = useSessionValidator();
  const { data, isError, isLoading } = validateSession;

  const navigate = useNavigate();
  if (isError || !data) {
    navigate("/login");
  }

  if (isLoading) return null;

  return <div>Home</div>;
}
