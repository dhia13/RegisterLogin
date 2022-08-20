const router = require('express').Router()
const AuthCtrl = require('../controllers/AuthController')
const { protect, Admin } = require('../utils/Authentication')
//register
router.post('/register', AuthCtrl.register)
//check email availability
router.put('/email', AuthCtrl.checkEmailAvailability)
//activate account verify email
router.post('/activation', AuthCtrl.activateEmail)
//login
router.post('/login', AuthCtrl.login)
//request change password
router.post('/requestPasswordChange', AuthCtrl.requestPasswordChange)
// change password
router.post('/changePassword', AuthCtrl.changePassword)

module.exports = router