const uuid = require('uuid').v4;
const fs = require('fs');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        {
            cb(null, 'public');
        }
    },
    filename: async (req, file, cb) => {
        if(!file) cb(null)
        const ext = path.extname(file.originalname);
        if(!req.uploadedFiles) req.uploadedFiles={};
        if(!req.uploadedFiles.hasOwnProperty(file.fieldname)) req.uploadedFiles[file.fieldname]=[]
        const id = uuid();
        const directory = file.fieldname;
        const filePath = `uploads/${directory}/${id}${ext}`;
        if (!fs.existsSync(`public/uploads/${directory}`)) {
            fs.mkdirSync(`public/uploads/${directory}`, {recursive: true});
        }
        req.uploadedFiles[file.fieldname].push(`${id}${ext}`)
        cb(null,filePath)
    }
})

module.exports.fileUpload = multer({storage})
