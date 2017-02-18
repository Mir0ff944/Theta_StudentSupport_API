'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())

const timetable = require('') //main module goes here
const globals = require('.modules/globals.js')

const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('', next) // the first page to open if nothing is selected
})

server.get('', (req, res) => {

})

server.get ('', (req, res) => {

})

server.get ('', (req, res) => {

})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.log(err)
	} else {
		console.log('running at: http://localhost:' + port)
	}
})
