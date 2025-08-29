import {Link} from 'react-router-dom'


const Navigation = () => {
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
          <button>
            <Link to="/add">add Books</Link>
        </button>
    </div>
  )
}

export default Navigation