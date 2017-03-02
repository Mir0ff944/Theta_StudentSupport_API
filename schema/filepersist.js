'use strict'

const schema = require('./schema')

exports.getTeachers = () => new Promise((resolve, reject) => {
	schema.Sessions.find((err, sessions ) => {
		if (err) reject(new Error('database error'))
		if (!sessions.length) reject(new Error('sessions list is empty'))
		resolve({sessions})
	})
})

exports.addSession = TeacherInformation => new Promise ((resolve, reject ) => {
	if(!'teacher.name' in TeacherInformation && !'teacher.email' in TeacherInformation && !'teacher.time' in TeacherInformation && !'teacher.specialisation' in TeacherInformation) {
		reject(new Error('invalid information'))
	}
	const teachers = new schema.Teachers(TeacherInformation)

	teachers.save( (err, teacher) => {
		if (err) {
			reject(new Error('Error while adding teacher'))
		}
		resolve(teacher)
	})
	resolve({teachers})
})

exports.updateSession = (name, time) => new Promise((resolve, reject) => {
	schema.Timetable.findOneAndUpdate({'name': name}, {'time': time}, err => {
		if(err) reject(new Error('database error'))
		resolve(`${name}'s timetable has been updated`)
	})
})

exports.sessionExists = (name, time) => new Promise( (resolve, reject) => {
	schema.sessions.find( {name: name, time: time} , (err ,session) => {
		if (err) reject(new Error('database error'))
		if (session.length) reject(new Error('session already exists'))
		resolve()

	})
})

// exports.attending = () => new Promise((resolve, reject) => {
// 	 schema.Attending.createIndex()
// })