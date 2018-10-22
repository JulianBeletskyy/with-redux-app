import { goAuth } from '../api'
import store from '../store'
import { logout } from '../actions/auth'
import { Router } from '../routes'

export const getArray = (array, name) => {
	const temp = array.map(item => ({value: item.id, name: item.value}))
	return [{ value: '', name: name }, ...temp]
}

export const heightsArray = array => {
        const temp = array.map(item => ({value: item.id, name: `${item.cm} cm / ( ${item.inch} )`}))
        return [{ value: '', name: 'Height' }, ...temp]
    }

export const weightsArray = array => {
	const temp = array.map(item => ({value: item.id, name: `${item.kg} kg / ${item.lbs} lbs`}))
	return [{ value: '', name: 'Weight' }, ...temp]
}

export const monthArray = () => {
    return [
        { 'value': '', 'name': 'Month'},
        { 'value': '1', 'name': 'Jan' }, 
        { 'value': '2', 'name': 'Feb' },
        { 'value': '3', 'name': 'Mar' },
        { 'value': '4', 'name': 'Apr' },
        { 'value': '5', 'name': 'May' },
        { 'value': '6', 'name': 'Jun' },
        { 'value': '7', 'name': 'Jul' },
        { 'value': '8', 'name': 'Aug' },
        { 'value': '9', 'name': 'Sep' },
        { 'value': '10', 'name': 'Oct' },
        { 'value': '11', 'name': 'Nov' },
        { 'value': '12', 'name': 'Dec' }
    ]
}

export const yearArray = () => {
    let temp = [{'value': '', 'name': 'Year'}]
    let date = new Date()
    let year = date.getFullYear()
    year -= 18
    let from = year - 72
    for (year; year >= from; year--) {
        temp.push({'value': year, 'name': year})
    }
    return temp
}

export const dayArray = () => {
    let temp = [{'value': '', 'name': 'Day'}]
    for (var k = 1; k <= 31; k++) {
        temp.push({'value': k, 'name': k})
    }
    return temp
}

export const getNumArray = (type, from, to) => {
    let temp = [{ 'value': '', 'name': type }]
    if (type === 'from') {
        for (from; from <= to; from++) {
            temp.push({ 'value': from, 'name': from })
        }
    } else {
        for (from; from >= to; from--) {
            temp.push({ 'value': from, 'name': from })
        }
    }
    return temp;
}

export const formatDate = value => {
	const digits = /[^0-9]+/g
	let digitsValue = value.replace(digits, '')
	if (digitsValue.length > 8) {
        digitsValue = digitsValue.slice(0, 8)
    }
    if (digitsValue.length >= 5) {
        digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2,4)}/${digitsValue.slice(4)}`
    } else if (digitsValue.length >= 3) {
        digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2)}`
    }
    return digitsValue
}

export const makeBlur = item => {
    const image = new Image()
    image.src = `${item.src}?${new Date().getTime()}`
    image.setAttribute('crossOrigin', '')
    
    const canvas = document.createElement(`canvas`)
    const ctx = canvas.getContext("2d")
    image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.filter = 'blur(10px)'
        ctx.globalAlpha = 0.5
        ctx.drawImage(image, 0, 0)
        const url = canvas.toDataURL()
        console.log(url)
        return url
    }
    return Promise.resolve(image.onload())
}
