'use strict'

const mongoose = require('mongoose')
const db = {
	user: 'miroff',
	password: 'passwordhuehue'
}


mongoose.connect(`mongodb://${db.user}:${db.password}@ds055852.mlab.com:55852/302cemagile`)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema


const timetableSchema = new Schema ({
	name: String,
	email: String,
	date: String,
	start_time: String,
	end_time: String,
	specialisation: String
})

const studentUserSchema = new Schema ({
	name: String,
	email: String,
	id: Number,
})

const teacherUserSchema = new Schema ({
	name: String,
	email: String,
	specialisation: String

})

const attending = new Schema ({
	attending: String
})

exports.Sessions = mongoose.model('Sessions', timetableSchema)
exports.Student = mongoose.model('Student', studentUserSchema)
exports.Teachers = mongoose.model('Teachers', teacherUserSchema)
exports.Attending = mongoose.model('Attendings',attending )


// mongo ds055852.mlab.com:55852/302cemagile -u * -p *
