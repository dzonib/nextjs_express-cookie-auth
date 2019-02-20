import {useEffect, useState} from 'react'
import {getUserProfile} from '../lib/auth'

export default function Profile() {

    const [userProfile, setUserProfile] = useState('')

    useEffect(() => {
        const profile = getUserProfile()
        // odje dobijam promise
        console.log(profile)
        setUserProfile(profile)
    }, [])

    return (
        <pre>{JSON.stringify(userProfile, null, 4)}</pre>
    )
}