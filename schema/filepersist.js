'use strict'

const schema = require('./schema')

exports.getTeachers = () => new Promise((resolve, reject) => {
	schema.Teachers.find((err, teachers ) => {
		if (err) reject(new Error('database error'))
		if (!teachers.length) reject(new Error('teachers list is empty'))
		resolve({teachers})
	})
})

exports.addTeachers = TeacherInformation => new Promise ((resolve, reject ) => {
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

// exports.attending = () => new Promise((resolve, reject) => {
// 	 schema.Attending.createIndex()
// })
