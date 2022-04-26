const express = require('express')
const router = express.Router()
const {get_all_comments,add_comment,get_unique_comment,update_comment,delete_coment,get_all_comments_user} = require('../controller/comments')
const {get_all_users,get_user,add_user,update_user,delete_user,login,login_token} = require('../controller/users')
const {validate,validate_is_real_user,validate_is_admin} = require('../middleware/token')
const {guardar_archivo,validar_archivo} = require('../middleware/multer')
const {validation_mail} = require('../middleware/validator')

const default_response = (req,res) => res.status(200).json({code:'OK',SERVER_STATUS:'READY'})
const view_data = (req,res,next) => {
    console.log(req.body) 
    next()
} 

router.get('/',default_response)

router.get('/user',validate_is_admin,get_all_users)
router.get('/user/:id',validate,get_user)
router.post('/user',add_user)
router.put('/user',validate_is_real_user,update_user)
router.delete('/user',validate_is_real_user,delete_user)

router.post('/user/login',login)
router.post('/user/login_token',validate,login_token)

router.get('/imagen',(req,res)=> res.sendFile('/readme.txt'))
router.post('/imagen',guardar_archivo,validar_archivo)

router.get('/comments',validate,get_all_comments)
router.get('/comments/:id',validate,get_unique_comment)
router.post('/comments',validate_is_real_user,add_comment)
router.put('/comments',validate_is_real_user,update_comment)
router.delete('/comments',validate_is_real_user,delete_coment)

router.get('/comments/user/:id',validate,get_all_comments_user)

module.exports = router