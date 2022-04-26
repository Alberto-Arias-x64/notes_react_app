const {body,validationResult} = require('express-validator')

const validate = (req, res,next) =>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
const validate_body =  body('mail').exists().isEmail()

exports.validation_mail = [validate_body,validate]