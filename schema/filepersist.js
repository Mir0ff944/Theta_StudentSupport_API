'use strict'

const schema = require('./schema')

exports.getTeachers = () => new Promise((resolve, reject) => {
	schema.Teacher.find((err, Teachers) => {
		if (err) reject(new Error('database error'))
		if (!Teachers.length) reject(new Error('favorites list is empty'))
		resolve({Teachers})
	})
})

exports.updateSession = (name, time) => new Promise((resolve, reject) => {
	schema.Timetable.findOneAndUpdate({'name': name}, {'time': time}, err => {
		if(err) reject(new Error('database error'))
		resolve(`${name}'s timetable has been updated`)
	})
})
exports.attending = () => new Promise((resolve, reject) => {
	 schema.Attending.createIndex()
})
