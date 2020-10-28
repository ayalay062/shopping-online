import { Router } from "express";

const multer = require('multer');
const fileExtension = require('file-extension')

// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req: Request, file: any, cb: any) {
        cb(null, '../upload')
    },

    // Setting name of file saved
    filename: function (req: Request, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})

var upload = multer({
    storage: storage,

    fileFilter(req: Request, file: any, cb: any) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/gi)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})

export const uploadRouter = Router();


uploadRouter.post('/', upload.single('uploadedImage'), (req: any, res: any, next: any) => {
    const { file } = req;
    if (!file) {
        const error = new Error('Please upload a file')
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error: Error, req: any, res: any, next: any) => {
    res.status(400).send({
        error: error.message
    })
});

uploadRouter.get('/:image', (req, res) => {
    const { image } = req.params;
    res.sendFile(image, { root: '../upload' });
});