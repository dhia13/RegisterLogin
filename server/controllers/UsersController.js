const { User } = require('../models/User')
const jwt = require('jsonwebtoken')
const sendMail = require('../Utils/SendEmail')

const UsersCtrl = {
    getUser: async (req, res) => {
        try {
            const userData = await User.findById(req.params.id)
            res.status(200).json({ msg: 'userFound', UserData: userData, Success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUsers: async (req, res) => {
        try {
            console.log('Users Route')
            res.status(200)
        } catch (error) {
            res.status(404)
        }
    },
    myData: async (req, res) => {
        try {
            const MyData = await User.findById(req.user._id).
                select({ password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            res.status(200).json({ msg: 'User Data Sent', MyData: MyData, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message, sucess: false })
        }
    },
    updateProfile: async (req, res) => {
        //works only with changing name at the moment 
        try {
            if (req.body.isAdmin) {
                res.status(400).json({ msg: 'you are not authorised', success: false })
            }
            else if (req.body.email || req.body.password) {
                res.status(400).json({ msg: 'wronge route', success: false })
            }
            else if (req.body.name) {
                const user = await User.findOne({ name: req.body.name })
                if (user) {
                    res.status(400).json({ msg: 'user name already taken', success: false })
                }
                else {
                    await User.findByIdAndUpdate(
                        req.user._id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    const user = await User.findById(req.user._id).select(['-password'])
                    res.status(201).json({ msg: 'Profile Updated', Success: true, MyData: user })
                }
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message, Success: false })
        }
    },
    requestEmailChange: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select({ name: 1, email: 1 })
            const payload = {
                email: user.email,
                name: user.name
            }
            const changeEmailToken = createChangeEmailToken(payload)
            sendMail(user.email, changeEmailToken, "Change you Email")
            res.json({ msg: 'A confirmation email was sent to you adress.', success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message, sucess: false })
        }
    },
    changeEmail: async (req, res) => {
        try {
            const user = jwt.verify(req.body.Email_Token, process.env.CHANGE_EMAIL_TOKEN_SECRET)
            const validate = validateEmail(req.body.new_email)
            if (!validate) return res.status(400).json({ msg: 'Email Invalid', success: false })
            const payload = { old_email: user.email, name: user.name, new_email: req.body.new_email }
            const changeEmailToken = createChangeEmailToken(payload)
            sendMail(req.body.new_email, changeEmailToken, 'confirm new Email')
            res.status(202).json({ success: true, msg: 'please confirm new email' })
        } catch (error) {
            return res.status(500).json({ msg: error.message, sucess: false })
        }
    },
    confirmNewEmail: async (req, res) => {
        try {
            console.log(req.body.New_Email_Token)
            const user = jwt.verify(req.body.New_Email_Token, process.env.CHANGE_EMAIL_TOKEN_SECRET)
            await User.findOneAndUpdate({ email: user.old_email }, { email: user.new_email });
            res.status(201).json({ msg: "Email Updated", success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message, sucess: false })
        }
    },
    deleteAccount: async (req, res) => {
        try {
            await User.findByIdAndRemove(req.user._id)
            res.status(201).json({ msg: "Account Deleted", Success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}
const createChangeEmailToken = (payload) => {
    return jwt.sign(payload, process.env.CHANGE_EMAIL_TOKEN_SECRET, { expiresIn: '15m' })
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
module.exports = UsersCtrl