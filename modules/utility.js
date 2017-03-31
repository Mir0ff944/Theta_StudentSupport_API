'use strict'

const bcrypt = require('bcrypt')
const passlen = 10

exports.getHeader = request => new Promise ((resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error('Missing authorization'))
	}
	const auth = request.authorization.basic

	console.log('utility', auth)

	if (auth.username === undefined || auth.password === undefined) {
		reject({username: auth.username, password: auth.password})
	}
	// console.log(request.authorization)
	// console.log(`username: ${auth.username}, password: ${auth.password}`)
	resolve(auth)
})

exports.extractBodyKey = (request, key) => new Promise((resolve, reject) => {
	// console.log(request)	//debuging spec tests
	// console.log(key)
	if (request.body === undefined || request.body[key] === undefined)
		reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.hashPassword = details => new Promise( (resolve, reject) => {
	const salt = bcrypt.genSaltSync(passlen)

	details.password = bcrypt.hashSync(details.password, salt)
	resolve(details)
})

exports.checkPassword = (provided, stored) => new Promise( (resolve, reject) => {
	if (!bcrypt.compareSync(provided, stored)) {
		reject(new Error('invalid password'))
	}
	resolve()
})

dasdadasd
