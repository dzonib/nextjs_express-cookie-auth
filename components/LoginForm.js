import { useState } from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router'

function LoginForm() {
	const [ email, setEmail ] = useState('Sincere@april.biz')
	const [ password, setPassword ] = useState('hildegard.org')

	function handleChange(event) {
		event.target.name === 'email' ? setEmail(event.target.value) : setPassword(event.target.value)
    }
    
    function handleSubmit(e) {
        e.preventDefault()

		loginUser(email, password)
		
		Router.push('/profile')
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
			<button type="submit">Login</button>
		</form>
	)
}

export default LoginForm
