const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'static/tiny/',
    filename: function (req,file,cb) {
        cb(null,`${Date.now()}-${file.originalname}`)
    },
    fileFilter:'',
    limits:''
})
const upload = multer({storage})

exports.guardar_archivo = upload.single('myfile')

exports.validar_archivo = (req,res) =>{
    res.send('va todo bien')
}