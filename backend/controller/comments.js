const Comment = require('../model/comments')
const User = require('../model/users')

function catch_error (error,res) {
    res.status(400).json({code : 'FAIL', ...error}
)}

exports.get_all_comments = (req,res) => {
    Comment.findAll()
    .then(async crud => {
        if (crud.length != 0) {
            crud.sort((a, b) => {
                return b.createdAt - a.createdAt
            });
            const new_crud = await Promise.all(crud.map(async element => {
                const user = await User.findByPk(element.UserId)
                return {...element.dataValues,user:user.dataValues.name,imagen:user.dataValues.imagen}
            }))
            res.status(200).json(new_crud)
        }
        else res.status(400).json({code : 'NO FOUND'})
    })
    .catch(error => catch_error(error,res))
}
exports.get_unique_comment = (req,res) => {
    Comment.findOne({where : { id_comment : req.params.id}})
    .then(crud => {
        if (crud.length != 0) res.status(200).json(crud)
        else res.status(400).json({code : 'NO FOUND'})
    })
    .catch(error => catch_error(error,res))
}
exports.add_comment = (req,res) => {
    const {title,note,id} = req.body
    if(title ==='' || note === '') catch_error({error:'MISSING DATA'},res)
    else{
        Comment.create({title,note,UserId:id})
        .then(async crud => {
            const user = await User.findByPk(crud.UserId)
            res.status(200).json({...crud.dataValues,user:user.dataValues.name, imagen:user.dataValues.imagen})
        })
        .catch(error => catch_error(error,res))
    }
}
exports.update_comment = (req,res) => {
    const {id_comment,title,note} = req.body
    if(title ==='' || note === '') catch_error({error:'MISSING DATA'},res)
    else{
        Comment.update({title,note},{where : {id_comment}}) 
        .then(() => {
            req.params.id = id
            this.get_unique_comment(req,res)
        })
        .catch(error => catch_error(error,res))
    }
}
exports.delete_coment = (req,res) => {
    const {id_comment} = req.body
    Comment.destroy({where : {id_comment}})
    .then(crud => {
        if (crud != 0) res.status(200).json({code:'DELETED'})
        else res.status(400).json({code : 'NO FOUND'})
    })
    .catch(error => catch_error(error,res))
}

exports.get_all_comments_user = (req,res) => {
    Comment.findAll({where: {UserId: req.params.id}})
    .then(async crud => {
        if (crud.length != 0) {
            crud.sort((a, b) => {
                return b.createdAt - a.createdAt
            });
            const new_crud = await Promise.all(crud.map(async element => {
                const user = await User.findByPk(element.UserId)
                return {...element.dataValues,user:user.dataValues.name,imagen:user.dataValues.imagen}
            }))
            res.status(200).json(new_crud)
        }
        else res.status(200).json([])
    })
    .catch(error => catch_error(error,res))
}