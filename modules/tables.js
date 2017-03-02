'use strict'

const filepersist = require('../schema/filepersist')

exports.getTeacherSessions = (request, callback) => {
	getHeader(request)
	.then( () => filepersist.getTeachers())
	.then(console.log('showing favorites'))
    .then(data => callback(null, data))
    .then(err => callback(err))
}

exports.addSessions = (request, callback) => {
	getHeader(request)
	.then ( () => extractBodyKey(request, 'session'))
	.then(data => {
		this.name = data.name
		this.time = data.time
		console.log(this.name, this.time)
		return data
	}).then(session => {
		this.session = session
		return filepersist.sessionExists(this.name, this.time)
	}).then(session => filepersist.addSession(session))
	.then(session => callback(null, session))
	.catch(err => callback(err))
}

const getHeader = request => new Promise ((resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error('Missing authorization'))
	}
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined) {
		reject({username: auth.username, password: auth.password})
	}
	// console.log(request.authorization)
	// console.log(`username: ${auth.username}, password: ${auth.password}`)
	resolve()
})

const extractBodyKey = (request, key) => new Promise((resolve, reject) => {
	// console.log(request)	//debuging spec tests
	// console.log(key)
	if (request.body === undefined || request.body[key] === undefined)
		reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})
