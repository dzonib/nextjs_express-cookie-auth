const next = require('next')
const express = require('express')
const axios = require('axios')
const cookieParser = require('cookie-parser')


const dev = process.env.NODE_ENV !== 'production'
const port = process.env.port || 3000
const app = next({ dev })
const handle = app.getRequestHandler()


const AUTH_USER_TYPE = 'authenticated'
const COOKIE_SUPER_ULTRA_MEGA_SECRET = 'aaa'

const COOKIE_OPTIONS = {
    // OPTIONS FOR SECURITY 
    
    // domain so they are valid only for that domain
    // domain: ""

    // prevents client js access to cookie
    httpOnly: true,
    // works only for https
    secure: !dev,
    // we can verify the source of the cookie
    signed: true,
}

const authenticate = async (email, password) => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')

    return data.find(user => {
        if (user.email === email && user.website === password) {
            return user
        }
    })
}


app.prepare().then(() => {
    const server = express()

    server.use(express.json())
    server.use(cookieParser(COOKIE_SUPER_ULTRA_MEGA_SECRET))

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body

    try {
        const user = await authenticate(email, password)

        if (!user) {
            return res.status(403).send('Invalid email or password')
        }

        const userData = {
            name: user.name,
            email: user.email,
            type: AUTH_USER_TYPE
        }

        // first arg = name, second = data, third = options
        res.cookie('token', userData, COOKIE_OPTIONS)

        res.json(userData)
    } catch(e) {
        res.status(403).json(e)
    }
    })

    server.post('/api/profile', async (req, res) => {
    try {
        const {signedCookies =  {}} = req

        console.log(JSON.stringify(signedCookies, null, 4))

        const {token} = signedCookies

        if (token && token.email) { 
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
            const userProfile = data.find(user => user.email === token.email)

            return res.json({user: userProfile})
        }

        res.status(404)
    } catch (e) {
        console.log(e.message)
    }
    })

    server.listen(port, err => {
        if (err) throw new Error(err)
        
        console.log(`App running on port ${port}`) 
    })
})