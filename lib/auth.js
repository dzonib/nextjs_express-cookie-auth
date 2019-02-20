import axios from 'axios'

axios.defaults.withCredentials = true

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post('/api/login', { email, password })

        // console.log(data)
    } catch(e) {
        console.log(e.message)
    }
}

export const getUserProfile = async () => {
    const {data} = await axios.post('/api/profile')
    console.log(data)
    return data
}