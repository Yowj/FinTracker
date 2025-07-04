import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useAuthUser from "./hooks/useAuthUser"; // I-add ito
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";

const App = () => {
  const { authUser, isLoading } = useAuthUser(); // Gamitin ang hook
  const isAuthenticated = Boolean(authUser);
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/transactions"
        element={isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/budgets"
        element={isAuthenticated ? <Budgets /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" replace />}
      />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
