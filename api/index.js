import { API_URL } from '../config'
import fetch from 'isomorphic-unfetch'
import initializeStore from '../store'
import { setAlert } from '../actions/ui'

let withMessage = false

const responseHandler = response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
        const promise = response.json()

        const ok = response.ok
        if (withMessage) {
            promise.then(response => {
                if (response.validate) {
                    for (let k in response.validate) {
                        if (k !== '_service') {
                            for (let j in response.validate[k]) {
                                initializeStore.dispatch(setAlert(response.validate[k][j], 'error'))
                            }
                        }
                    }
                }

                if (response.message && (! response.validate || response.validate == null)) {
                    initializeStore.dispatch(setAlert(response.message, ok ? 'success' : 'error'))
                }
                withMessage = false
            })
        }
        return promise;
    }
}

const responseBlobHandler = response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/pdf') !== -1) {
        const promise = response.blob()
        return promise
    }
}

const getHeader = () => 
    ({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${initializeStore.getState().user.token}`,
    })

export const get = (...data) => {
	const [url, alert = true] = data
	withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'get',
        headers: getHeader(),
    })
    .then(responseHandler)
}

export const post = (...data) => {
	const [url, alert = true, body] = data
	withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const put = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'put',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const remove = (...data) => {
	const [url, alert = false] = data
	withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'delete',
        headers: getHeader()
    })
    .then(responseHandler)
}

export const patch = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'patch',
        headers: getHeader(),
        body: JSON.stringify(body)
    })
    .then(responseHandler)
}

export const image = (...data) => {
    const [url, alert = false, body] = data
    withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {'Authorization': `Bearer ${initializeStore.getState().user.token}`},
        body: body
    })
    .then(responseHandler)
}

export const message = (...data) => {
    const [url, alert = true, body] = data
    withMessage = alert
    return fetch(`${API_URL}/${url}`, {
        method: 'post',
        headers: {'Authorization': `Bearer ${initializeStore.getState().user.token}`},
        body: body
    })
    .then(responseHandler)
}

export const getMyCountry = () => {
    return fetch('https://ipinfo.io', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(responseHandler)
}

export const goAuth = () => {
    return fetch(`${API_URL}/login/check`, {
        method: 'get',
        headers: {'Authorization': `Bearer ${initializeStore.getState().user.token}`},
    })
    .then(res => res)
}