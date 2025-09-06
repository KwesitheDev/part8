import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useField } from '../hooks/useField'

const LoginForm = ({ setToken}) => {
    const username = useField('text')
    const password = useField('password')
  const [login, {error}] = useMutation(LOGIN, {
      onCompleted: (data) => {
          const token = data.login.value
          setToken(token)
          localStorage.setItem('library-user-token', token)
      }
  })
    const submit = async(e) => {
        e.preventDefault()
         await login({variables: {username: username.value, password: password.value}})
        username.reset()
        password.reset()
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <input {...username} />
                </div>
                <div>
                    password <input {...password} />
                </div>
                <button type="submit">login</button>
            </form>
            {error && <p>{error.message}</p>}
        </div>
    )

}

export default LoginForm