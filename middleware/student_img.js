import multer from 'multer';
import path from 'path'

const stu_img = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './upload/Stu_upload');
    },
    filename: (req, res, cb) => {
        const uniqeName = Date.now() + path.extname(res.originalname);
        cb(null, uniqeName);
    }
})

export const stu_upload = multer({
    storage: stu_img,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const types = /jpg|jpeg|png|git/;
        const extname = types.test(path.extname(file.originalname).toLowerCase());
        const mimetype = types.test(file.mimetype);
        if (extname && mimetype) cb(null, true);
        else cb('Only JPG, JPEG, PNG files are allowed!');
    }
});