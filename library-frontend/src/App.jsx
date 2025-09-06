import { useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("library-user-token"));
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);

      client.cache.updateQuery({ query: ALL_BOOKS }, (existing) => {
        if (!existing) return { allBooks: [addedBook] };
        if (existing.allBooks.find((b) => b.title === addedBook.title)) {
          return existing;
        }
        return {
          allBooks: existing.allBooks.concat(addedBook),
        };
      });
    },
  });

  return (
    <div>
      <Navigation token={token} logout={logout} />
      <Routes>
        <Route path="/" element={<h2>Library App</h2>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add"
          element={token ? <NewBook /> : <LoginForm setToken={setToken} />}
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/recommendations"
          element={token ? <Recommendations /> : <LoginForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

export default App;
