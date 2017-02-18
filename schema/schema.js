'use strict'

const mongoose = require('mongoose')
const db = {
	user: 'Miroff',
	password: '0N0LRFX772277A'
}

mongoose.connect(`mongodb://${db.user}:${db.password}@ds055852.mlab.com:55852/302cemagile`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const timetableSchema = new Schema ({
	name: String,
	email: String,
	time: String
})

const studentSchema = new Schema ({
	sname: String,
	semail: String,
	sid: Number,
})

const teacherSchema = new Schema ({
	tname: String,
	temail: String,

})

const attending = new Schema ({
	attending: String
})

exports.Timetable = mongoose.model('Timetable', timetableSchema)
exports.Student = mongoose.model('StudentSchema', studentSchema)
exports.Teacher = mongoose.model('TeacherSchema', teacherSchema)
exports.Attending = mongoose.model('Attendings',attending )


// mongo ds055852.mlab.com:55852/302cemagile -u * -p *
