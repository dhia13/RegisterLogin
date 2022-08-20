const router = require('express').Router()
const UsersCtrl = require('../controllers/UsersController')
const { protect, Admin } = require('../Utils/Authentication')
//user access 
// access to own data
router.get('/MyData', protect, UsersCtrl.myData)
//update own data
router.put('/UpdateData', protect, UsersCtrl.updateProfile)

//change email
//request Email Change 
router.post('/requestEmailChange', protect, UsersCtrl.requestEmailChange)
//change Email 
router.post('/ChangeEmail', protect, UsersCtrl.changeEmail)
//confirm new Email
router.post('/confirmNewEmail', protect, UsersCtrl.confirmNewEmail)


//delete own account
router.delete('/DeleteAccount', protect, UsersCtrl.deleteAccount)
//see other users data 
router.get('/:id', protect, UsersCtrl.getUser)

router.get('/users', protect, UsersCtrl.getUsers)




module.exports = router