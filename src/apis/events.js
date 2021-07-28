
const ROOT = process.env.REACT_APP_BACKEND_ENDPOINT;
const LOGIN_API = `${ROOT}/api/login`
const GET_PUBLIC_EVENTS_API = `${ROOT}/api/events/public`
const GET_PRIVATE_EVENTS_API = `${ROOT}/api/events/private`
const CREATE_EVENT_API = `${ROOT}/api/events/create`
const ATTEND_EVENT_API = `${ROOT}/api/events/attend`


const handle_login = async (callback, googleData) => {
    localStorage.setItem('accessToken', googleData.accessToken)
    localStorage.setItem('token', googleData.tokenId)
    const res = await fetch(LOGIN_API, {
        method: "POST",
        body: JSON.stringify({
            token: googleData.tokenId,
            accessToken: googleData.accessToken
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if (data) {
        callback(googleData.profileObj)
    }
}



const get_public_events = async () => {
    const res = await fetch(GET_PUBLIC_EVENTS_API, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if (res.status === 200) {
        return data.public_events
    } else {
        return []
    }
}

const get_private_events = async (callback) => {
    const res = await fetch(GET_PRIVATE_EVENTS_API, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            "mode": 'no-cors'
        }
    })
    const data = await res.json()
    if (res.status === 200) {
        return data.private_events
    } else {
        callback()
        return []
    }
}

const create_event = async (event_details, callback) => {
    const res = await fetch(CREATE_EVENT_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            "mode": 'no-cors'
        },
        body: JSON.stringify({ event: event_details }),
    })
    const data = await res.json()
    if (data) {
        callback()
    }
}


const attend_event = async (event_id) => {
    const res = await fetch(ATTEND_EVENT_API, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            "mode": 'no-cors'
        },
        body: JSON.stringify({ event_id }),
    })
    const data = await res.json()
    return data
}


export { handle_login, get_public_events, get_private_events, create_event, attend_event }