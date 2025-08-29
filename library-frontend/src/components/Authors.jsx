import { EDIT_AUTHOR } from "../mutations"
import { ALL_AUTHORS } from "../queries"
import { useMutation, useQuery } from "@apollo/client"
import { useField } from "../hooks/useField"

const Authors = () => {
  const name = useField("text")
  const born = useField("number")

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (result.loading) return <div>loading...</div>
  if (result.error) return <div>Error: {result.error.message}</div>

  const authors = result.data.allAuthors || []

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.value || !born.value) return

    try {
      await editAuthor({
        variables: {
          name: name.value,
          setBornTo: Number(born.value)
        }
      })

      name.reset()
      born.reset()
    } catch (error) {
      console.error("Error updating author:", error)
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select
            value={name.value}
            onChange={name.onChange}
            required
          >
            <option value="" disabled>
              select author
            </option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born.value}
            onChange={born.onChange}
            required
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
