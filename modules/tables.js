'use strict'

const filepersist = require('../schema/filepersist')

exports.getTeacherSessions = (request, callback) => {
	getHeader(request)
	.then( () => filepersist.getTeachers())
	.then(console.log('showing favorites'))
    .then(data => callback(null, data))
    .then(err => callback(err))
}

// exports.addTeacher = (request, callback) => {

// }

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
