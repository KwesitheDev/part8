import { useQuery } from "@apollo/client";
import { ME, BOOKS_BY_GENRE } from "../queries";

const Recommendations = () => {
  const { data: userData, loading: userLoading } = useQuery(ME);

  const favGenre = userData?.me?.favoriteGenre;

  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favGenre },
    skip: !favGenre,
  });

  if (userLoading || booksLoading) return <div>loading...</div>;
  if (!favGenre) return <div>No favorite genre set</div>;

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
