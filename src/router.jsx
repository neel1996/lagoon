import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RepoDetails from "./components/RepoDetails";
import AuthRouter from "./AuthRouter";
import Page from "./components/Page";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthRouter>
                <Page heading={"Repositories"}>
                  <Home />
                </Page>
              </AuthRouter>
            }
          />
          <Route
            path="/repo/:org/:name"
            element={
              <AuthRouter>
                <Page heading={"Ingestion"}>
                  <RepoDetails />
                </Page>
              </AuthRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
