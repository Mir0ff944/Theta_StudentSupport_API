'use strict'

var fs = require('fs')
var rewire = require('rewire')
var utility = rewire("../schema/filepersist")
var schema = require("../schema/schema")

describe('Account Model', () => {

  beforeEach( () => {
    utility.clearAccounts()
  })

  describe('creates teacher account', () => {
    it('should create a valid teacher account', () => {
      try {
        let user = utility.addUserTeacher('testteacher', 'passwordd34')
        expect(user).toEqual({username: 'testteacher'})
      } catch (err) {
        fail('error should not be thrown')
      } finally {
        schema.Teachers.find({}, (err, count) => {
          if (err) expect(true).toBe(false) //error should not be throwns
          expect(count).toBe(1)
        })
      }
    })

    it('should create a teacher account with different credentials', () => {
      try {
        let user = utility.addUserTeacher('testteacher2', 'passwordd34')
        expect(user).toEqual({status: 'success', username: 'testteacher2'})
      } catch (err) {
        throw new Error(err)
      } finally {
        schema.Teachers.find({}, (err, count) => {
          if (err) expect(true).toBe(false) //error should not be throwns
          expect(count).toBe(1)
        })
      }
    })

    it('should prevent dublicate teacher usernames from being created', () => {
      try {
        utility.addUserTeacher('testteacher', 'passwordd34')
        experct(utility.addUserTeacher('testteacher', 'passwordd34')).toThrow()
        fail('this line should not run')
      } catch(err) {
        expect(err.message).toBe('Teacher account "testteacher" already exists')
      } finally {
        expect(utility.count).toBe(1)
      }
    })

    it('should throw an error if missing username', () => {
      try {
        utility.addUserTeacher('testteacher', 'passwordd34')
        expect(utility.addUserTeacher('', 'passwordd34'))
      } catch (err) {
        expect(err.message).toBe('missing name/pass parameter')
      } finally {
        expect(utility.count).toBe(1)
      }
    })
  })


  // describe('creates student account', () => {
  //   it('should create a valid student account', () => {
  //     try {
  //       let user = utility.addUserStudent('teststudent', 'passwordd34')
  //       expect(user).toEqual({status: 'success', username: 'teststudent'})
  //     } catch (err) {
  //       fail('error should not be thrown')
  //     } finally {
  //       expect(utility.count).toBe(1)
  //     }
  //   })
  //
  //   it('should create a student account with different credentials', () => {
  //     try {
  //       utility.addUserStudent('teststudent2', 'passwordd34')
  //       expect(user).toEqual({status: 'success', username: 'teststudent2'})
  //     } catch (err) {
  //       fail('error should not be thrown')
  //     } finally {
  //       expect(utility.count).toBe(1)
  //     }
  //   })
  //
  //   it('should prevent dublicate student usernames from being created', () => {
  //     try {
  //       utility.addUserTeacher('teststudent', 'passwordd34')
  //       experct(utility.addUserTeacher('teststudent', 'passwordd34')).toThrow()
  //       fail('this line should not run')
  //     } catch(err) {
  //       expect(err.message).toBe('Teacher account "teststudent" already exists')
  //     } finally {
  //       expect(utility.count).toBe(1)
  //     }
  //   })
  //
  //   it('should throw an error if missing username', () => {
  //     try {
  //       utility.addUserTeacher('teststudent', 'passwordd34')
  //       expect(utility.addUserTeacher('', 'passwordd34'))
  //     } catch (err) {
  //       expect(err.message).toBe('missing name/pass parameter')
  //     } finally {
  //       expect(utility.count).toBe(1)
  //     }
  //   })
  // })

})
