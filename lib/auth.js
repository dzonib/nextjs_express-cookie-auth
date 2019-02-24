import axios from 'axios'

axios.defaults.withCredentials = true

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post('/api/login', { email, password })

        // if for some reason we are on server
        if (typeof window !== 'undefined') {
            window.WINDOW_USER_SCRIPT_VARIABLE = data || {}
        }
    } catch(e) {
        throw new Error('Invalid email or password')
    }
}

export const getUserProfile = async () => {
    const {data} = await axios.post('/api/profile')
    
    return data
}


// server side code... _document only runs on server, so we can use cookie things
export const getServerSideToken = req => {
    const {signedCookies = {}} = req

    if (!signedCookies && !signedCookies.token) {
        return {}
    } 

    return {user: signedCookies.token}
    
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'

export const getUserScript = (user) => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`
}