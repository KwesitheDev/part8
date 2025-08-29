import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route } from 'react-router-dom'
import Navigation from "./components/Navigation";

const App = () => {

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<h2>Library App</h2>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
      </div>
  );
};

export default App;
