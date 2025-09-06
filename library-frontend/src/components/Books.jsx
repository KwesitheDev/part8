import { useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genre, setGenre] = useState(null);

  const { data: allData } = useQuery(ALL_BOOKS);
  const { data: genreData, refetch } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  });

  if (!allData) return <div>loading...</div>;

  const books = genre ? genreData?.allBooks || [] : allData.allBooks;

  // Collect unique genres
  const genres = [...new Set(allData.allBooks.flatMap((b) => b.genres))];

  return (
    <div>
      <h2>Books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => { setGenre(g); refetch({ genre: g }) }}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
