'use strict'

const filepersist = require('../schema/filepersist')
const utility = require('./utility')

exports.getSessions = (request, callback) => {
	// utility.getHeader(request)
	filepersist.getSessions()
	.then(console.log('showing favorites'))
    .then(data => callback(null, data))
    .then(err => callback(err))
}

exports.addSessions = (request, callback) => {
	// utility.getHeader(request)
	 utility.extractBodyKey(request, 'session')
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

// exports.addAttending = (request, callback) => {
// 	utility.getHeader(request).then( details => {
// 		this.username = details.username
// 		this.password = details.username
// 		return utility.hashPassword(details)
// 	}).then()
// }

exports.addUserTeacher = (request, callback) => {
	let data

	utility.getHeader(request).then( details => {
		console.log('tables', details)

		return utility.hashPassword(details)
	}).then ( details => {
		console.log('tables 1', details)
		data = details
		return filepersist.accountExists(details)
	}).then ( () => utility.extractBodyKey(request, 'name')
	).then ( name => {
		data.name = name
		return filepersist.addUserTeacher(data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		callback(err)
	})
}

exports.addUserStudent = (request, callaback) => {
	let data

	utility.getHeader(request).then ( details => utility.hashPassword(details)
	).then( details => {
		data = details
		return filepersist.accountExists(details)
	}).then ( () => utility.extractBodyKey(request, 'name')
	).then( name => {
		data.name = name
		return filepersist.addUserStudent(data)
	}).then( data => {
		callaback(null, data)
	}).catch ( err => {
		callaback(err)
	})
}
