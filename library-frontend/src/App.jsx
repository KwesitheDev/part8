import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("library-user-token"));

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
  };

  return (
    <div>
      <Navigation token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<h2>Library App</h2>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={token ? <NewBook /> : <LoginForm setToken={setToken} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
