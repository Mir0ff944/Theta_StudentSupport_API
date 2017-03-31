'use strict'

// const fs = require('fs')
const rewire = require('rewire')
const utility = rewire('../schema/filepersist')
const schema = require('../schema/schema')

describe('Teacher accounts', () => {

  	afterEach(() => {
  		utility.clearAccounts()
  	})

	it('should create a valid teacher account', done => {
		const user = {username: 'testteacher', password: 'passwordd34', name: 'Testname'}

		utility.addUserTeacher(user)
      .then(user => {
	expect(user).not.toBe(undefined)
	done()
}).catch(err => {
	throw new Error(err)
})
	})

	it('should create a teacher account with different credentials', done => {
  		const user = {username: 'testteacher1', password: 'passwordd34', name: 'Testname'}

  		utility.addUserTeacher(user)
        .then(user => {
  	expect(user).not.toBe(undefined)
  	done()
}).catch(err => {
  	throw new Error(err)
})
  	})

	xit('should prevent dublicate teacher usernames from being created', done => {
  		const user = {username: 'testteacher1', password: 'passwordd34', name: 'Testname'}

  		utility.addUserTeacher(user)
        .then(user => {
  	expect(user).not.toBe(undefined)
}).then(utility.addUserTeacher(user, err => {
  	expect(err).toBe(true)
  	done()
})).catch(err => {
  	throw new Error (err)
})
  	})

	it('should throw an error if missing username', done => {
    		const user = {username: '', password: 'password34', name: 'Testname'}

    		utility.addUserTeacher(user)
          .then(user => {
    	expect(user.usenrmae).toBe(undefined)
    	done()
}).catch(err => {
    	throw new Error(err)
})
    	})

})

describe('Student accoutn', () => {

	beforeEach(() => {
		utility.clearAccounts()
	})

	it('should create a valid student account', done => {
		const user = {username: 'teststudent', password: 'passwordd34', name: 'Testname'}

		utility.addUserStudent(user)
      .then(user => {
	expect(user).not.toBe(undefined)
	done()
}).catch(err => {
	throw new Error(err)
})
	})

	it('should create a student account with different credentials', done => {
  		const user = {username: 'teststudent1', password: 'passwordd34', name: 'Testname'}

  		utility.addUserStudent(user)
        .then(user => {
  	expect(user).not.toBe(undefined)
  	done()
}).catch(err => {
  	throw new Error(err)
})
  	})

	xit('should prevent dublicate student usernames from being created', done => {
  		const user = {username: 'teststudent1', password: 'passwordd34', name: 'Testname'}

  		utility.addUserStudent(user)
        .then(user => {
  	expect(user).not.toBe(undefined)
}).then(utility.addUserStudent(user, err => {
  	expect(err).toBe(true)
  	done()
})).catch(err => {
  	throw new Error (err)
})
  	})

	it('should throw an error if missing username', done => {
    		const user = {username: '', password: 'password34', name: 'Testname'}

    		utility.addUserTeacher(user)
          .then(user => {
    	expect(user.usenrmae).toBe(undefined)
    	done()
}).catch(err => {
    	throw new Error(err)
})
    	})

})
describe('sessions', () => {

	beforeEach(() => {
		schema.Sessions.deleteMany({'name': 'Cris'})
	})

	it('should add a session', done => {
		const details = {name: 'Cris', email: 'testemail@uni.coventry.ac.uk', time: '13:00 - 14:00', specialisation: 'Computing'}

		utility.addSession(details)
      .then(details => {
	expect(details).not.toBe(undefined)
	done()
}).catch(err => {
	throw new Error(err)
})
	})

	it('it should get get session', done => {
		const details = utility.addSession({name: 'Cris', email: 'testemail@uni.coventry.ac.uk', time: '13:00 - 14:00', specialisation: 'Computing'})

		utility.getSessions()
      .then(details => {
	expect(details).not.toBe(undefined)
	done()
}).catch(err => {
	throw new Error(err)
})
	})
})
