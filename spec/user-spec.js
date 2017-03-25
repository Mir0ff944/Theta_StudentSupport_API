'use strict'

var rewire = require('rewire')
var utility = rewire("../schema/filepersist")

describe('Account Model', () => {

  beforeEach( () => {
    utility.clearAccounts()
  })

  describe('creates teacher account', () => {
    it('should create a valid teacher account', () => {
      try {
        let user = utility.addUserTeacher('testteacher', 'passwordd34')
        expect(user).toEqual({status: 'success', username: 'testteacher'})
      } catch (err) {
        fail('error should not be thrown')
      } finally {
        expect(utility.count).toBe(1)
      }
    })

    it('should create a teacher account with different credentials', () => {
      try {
        utility.addUserTeacher('testteacher2', 'passwordd344')
        expect(user).toEqual(status: 'success', username: 'testteacher2')
      } catch (err) {
        fail('error should not be thrown')
      } finally {
        expect(utility.count).toBe(1)
      }
    })

    it('should create a valid student account', () => {
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
})
