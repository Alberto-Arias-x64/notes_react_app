const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/users')

function create_token(data){
    const token = jwt.sign(data, process.env.PROJECT_PASSWORD)
    return token
}

const decode = data =>{
    const token = jwt.decode(data, process.env.PROJECT_PASSWORD)
    return token
}

const validate = async(req,res,next) =>{
    const authorization = req.get('authorization')
    let token = null 
    try {
        if (authorization.toLowerCase().startsWith('bearer')) token = authorization.substring(7)
        jwt.verify(token, process.env.PROJECT_PASSWORD)
        next()
    } catch (error) {
        res.status(401).json({code:'NO VALID TOKEN'})
    }
}

const validate_is_real_user = async(req,res,next) =>{
    const authorization = req.get('authorization')
    const {id} = req.body
    let token = null 
    try {
        if (authorization.toLowerCase().startsWith('bearer')) token = authorization.substring(7)
        const data = jwt.decode(token, process.env.PROJECT_PASSWORD)
        if (data.id === id) next()
        else res.status(401).json({code:'ID TOKEN NO MATCH'})
    } catch (error) {
        res.status(401).json({code:'NO VALID TOKEN'})
    }
}

const validate_is_admin = async(req,res,next) =>{
    const authorization = req.get('authorization')
    const {id} = req.body
    let token = null 
    try {
        if (authorization.toLowerCase().startsWith('bearer')) token = authorization.substring(7)
        const data = jwt.decode(token, process.env.PROJECT_PASSWORD)
        if (data.id !== id) res.status(401).json({code:'ID TOKEN NO MATCH'})
        else {
            User.findByPk(data.id)
            .then(crud => {
                const {is_admin} = crud
                if(is_admin) next()
                else res.status(401).json({code:'NO ADMIN'})
            })
        }
        
    } catch (error) {
        res.status(401).json({code:'NO VALID TOKEN'})
    }
}

module.exports ={create_token,validate,decode,validate_is_real_user,validate_is_admin}