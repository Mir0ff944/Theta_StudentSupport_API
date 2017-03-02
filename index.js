'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const timetable = require('./modules/tables') //main module goes here
const globals = require('./modules/globals') //global variables

const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/teachers', next) // the first page to open if nothing is selected
})

/**
 * @api {get} /tables Request teachers timetable sessions from database
 * @apiGroup tables
 */
server.get('/sessions', (req, res) => {
	timetable.getTeacherSessions(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts','GET')
		if (err) {
			res.send(globals.badRequestm, {error: err.message})
		} else {
			res.send(globals.ok, data)
		}
		res.end()
	})

})

server.post ('/teachers', (req, res) => {
	timetable.addSessions
})

// server.get ('', (req, res) => {

// })

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.log(err)
	} else {
		console.log('running at: http://localhost:' + port)
	}
})
