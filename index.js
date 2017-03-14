'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const tables = require('./modules/tables') //main module goes here
const globals = require('./modules/globals') //global variables

const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/sessions', next) // the first page to open if nothing is selected
})

/**
 * @api {get} /tables Request teachers tables sessions from database
 * @apiGroup tables
 */
server.get('/sessions', (req, res) => {
	tables.getSessions(req, (err, data) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts','GET', 'POST', 'PUT', 'DELETE')
		if (err) {
			res.send(globals.badRequestm, {error: err.message})
		} else {
			res.send(globals.ok, data)
		}
		res.end()
	})

})
/**
 * @api {post} /tables Posts a new session into the timeable
 * @apiGroup tables
 */
server.post ('/sessions', (req, res) => {
	tables.addSessions(req, (err, session) => {
		res.setHeader('content-type', globals.format.json)
		res.setHeader('accepts','GET', 'POST', 'PUT', 'DELETE')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(global.ok, session)
		}
		res.end()
	})
})

server.post('/session', (req, res) => {
	tables.addSessions(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET', 'POST')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {session: data})
		}
		res.end()
	})
})

server.get('/cart', (req, res) => {
	tables.getSessions(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET', 'POST')
		if (err) {
			res.send(global.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {session: data})
		}
		res.end()
	})
})

server.post('/teacherUsers', (req, res) => {
	tables.addUserTeacher(req, (err, data) => {
		res.setHeader('content-type','application/json')
		res.setHeader('accepts', 'GET', 'POST')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {user: data})
		}
		res.end()
	})
})

server.post('/studentUsers', (req, res) => {
	tables.addUserStudent(req, (err, data) => {
		res.setHeader('content-type','application/json')
		res.setHeader('accepts', 'GET', 'POST')
		if (err) {
			res.send(globals.badRequest, {error: err.message})
		} else {
			res.send(globals.created, {user: data})
		}
		res.end()
	})
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.log(err)
	} else {
		console.log('running at: http://localhost:' + port)
	}
})
