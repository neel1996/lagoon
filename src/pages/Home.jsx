import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import RepoList from "../components/RepoList";

export default function Home() {
  const { session } = useSession();
  const { data, isError, isLoading } = session;

  const navigate = useNavigate();
  if (isError || !data) {
    navigate("/login");
  }

  if (isLoading) return null;

  return (
    <div>
      <RepoList />
    </div>
  );
}
