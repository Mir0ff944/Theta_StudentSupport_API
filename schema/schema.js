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
	time: String,
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
exports.Student = mongoose.model('StudentSchema', studentUserSchema)
exports.Teachers = mongoose.model('Teachers', teacherUserSchema)
exports.Attending = mongoose.model('Attendings',attending )


// mongo ds055852.mlab.com:55852/302cemagile -u * -p *
