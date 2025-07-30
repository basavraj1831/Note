import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import Layout from "./components/Layout";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./components/Loader";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";


const App: React.FC = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/create-note"
          element={
            isAuthenticated ? (
              <Layout>
                <CreateNote />
              </Layout>
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
