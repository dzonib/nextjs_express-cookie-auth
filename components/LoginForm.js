import { useState } from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router'

function LoginForm()  { 
	const [ email, setEmail ] = useState('Sincere@april.biz')
	const [ password, setPassword ] = useState('hildegard.org')
	const [error, setErrors] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	function handleChange(event) {
		event.target.name === 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
  	}
    
  	function handleSubmit(e) {
    	e.preventDefault()

		setErrors('')
		setIsLoading(true)
	  
		loginUser(email, password).then(() => {
			Router.push('/profile')
		}).catch((e) => {
			handleErrors(e)
			setIsLoading(false)
		})
			
	}
	
	function handleErrors(err) {
		const error = err.response && err.response.data || err.message
		setErrors(error)
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>{email}</h1>
			<h1>{password}</h1>
			<div>
				<input type="email" value={email} name="email" placeholder="email" onChange={handleChange} />
			</div>
			<div>
				<input type="password" value={password} name="password" placeholder="password" onChange={handleChange} />
			</div>
			<button disabled={isLoading} type="submit">{isLoading ? 'Logging in...' : "Login"}</button>
			{error && <div>{error}</div>}
		</form>
	)
}

export default LoginForm
