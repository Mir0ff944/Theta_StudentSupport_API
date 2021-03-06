'use strict'

const schema = require('./schema')

exports.getSessions = () => new Promise((resolve, reject) => {
	schema.Sessions.find((err, sessions ) => {
		if (err) reject(new Error('database error'))
		if (!sessions.length) reject(new Error('sessions list is empty'))
		resolve({sessions})
	})
})

exports.addSession = SessionInformation => new Promise ((resolve, reject ) => {
	if(!'sessions.name' in SessionInformation && !'sessions.email' in SessionInformation && !'sessions.time' in SessionInformation && !'sessions.specialisation' in SessionInformation) {
		reject(new Error('invalid information'))
	}
	const sessions = new schema.Sessions(SessionInformation)

	sessions.save( (err, teacher) => {
		if (err) {
			reject(new Error('Error while adding teacher'))
		}
		resolve(teacher)
	})
	resolve({sessions})
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

// exports.getDetailsTeachers = details => new Promise( (resolve, reject) => {
// 	schema.Teachers.find({username: details.username}, (err, docs) => {
// 		if(err) reject(new Error('database error'))
// 		if(docs.length) resolve(docs)
// 		reject(new Error('invalid username'))
// 	})
// })
//
// exports.getDetailsStudent = details => new Promise( (resolve, reject) => {
// 	schema.Student.find({username: details.username}, (err, docs) => {
// 		if(err) reject(new Error('database error'))
// 		if(docs.length) resolve(docs)
// 		reject(new Error('invalid username'))
// 	})
// })

exports.addUserTeacher = details => new Promise ( (resolve, reject) => {
	if (!'username' in details && !'password' in details && !'name' in details) {
		reject(new Error('missing name/pass parameter'))
	}
	const user = new schema.Teachers(details)

	user.save ( (err, user) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		if (user.length)
			delete details.password
		resolve(details)
	})
})

exports.addUserStudent = details => new Promise ( (resolve, reject) => {
	if (!'username' in details && !'password' in details && !'name' in details) {
		reject(new Error('missing name/pass parameter'))
	}
	const user = new schema.Student(details)

	user.save ( (err, user) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		if (user.length)
			delete details.password
		resolve(details)
	})
})

exports.accountExists = account => new Promise (( resolve, reject) => {
	if (schema.Teachers.find({username: account.username}, (err, docs) => {
		if (err) reject(new Error('user Teacher database error'))
		if (docs.length) reject(new Error(`Teacher account "${account.username}" already exists`))
	})) resolve()
	else if (schema.Student.find({username: account.username}, (err, docs) => {
		if (err) reject(new Error('user Student database error'))
		if (docs.length) reject(new Error(`Student account "${account.username}" already exists`))
	})) resolve()
	else reject(new Error('connecton - user database error'))
})

exports.clearAccounts = () => new Promise ( (resolve, reject) => {
	schema.Teachers.deleteMany({'name': 'Testname'}, (err, teachers) => {
		if (err) reject(new Error('teacher collection error'))
		if (!teachers.length) resolve ('teacher collection has been deleted')
	})
	schema.Student.deleteMany({'name': 'Testname'}, (err, student) => {
		if (err) reject(new Error('student collection error'))
		if (!student.length) resolve ('student collection has been deleted')
	})
})
