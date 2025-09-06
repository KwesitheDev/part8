import { Link } from "react-router-dom";

const Navigation = ({ token, logout }) => {
  return (
    <div>
      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/authors">Authors</Link>
      </button>
      <button>
        <Link to="/books">Books</Link>
      </button>
      {token ? (
        <>
          <button>
            <Link to="/add">Add Book</Link>
          </button>
          <button>
            <Link to="/recommendations">Recommendations</Link>
          </button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button>
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default Navigation;
