const express = require('express')
const LoginController = require('../controllers/LoginController')
const StaffController = require('../controllers/StaffController')
const verifyToken = require('../middleware/middleware')
const multer = require("multer");
const path = require('path');
require('dotenv').config();
const UserController = require('../controllers/UserController')
// const upload = multer({});

//Upload Anh luu vao project

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // specify the directory to store uploaded files
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const router = express.Router();
router.post('/login', LoginController.LoginUser)
router.post('/upload', upload.array('files'), UserController.UploadFile)
router.get('/api/user/list', verifyToken.verifyToken, verifyToken.authorizeAction(process.env.GET_LIST_USER), UserController.getListUser)
router.post('/api/user', verifyToken.verifyToken, verifyToken.authorizeAction(process.env.ADD_USER), UserController.addNewUser)
router.put('/api/user/delete/:id', verifyToken.verifyToken, verifyToken.authorizeAction(process.env.DELETE_USER), UserController.deleteUser)
router.get('/api/user/detail/:id', verifyToken.verifyToken, verifyToken.authorizeAction(process.env.USER_DETAIL_GET), UserController.getDetailUserInfo)
router.post('/api/staff', StaffController.addNewStaff)

module.exports = router