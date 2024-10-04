const express = require('express');
const userRoute = express.Router();
// const { userVerifyToken } = require('../helpers/userVerifyToken');
const upload = require('../../multer');

const {
    registerUser,
    validateRegisterUser,
    loginUser,
    validateLoginUser,
    getAllUser,
    getUser,
    validateGetUser,
    updateUser,
    validateUpdateUser,
    deleteUser,
    validateDeleteUser,
    updatePassword,
    validateUpdatePassword,
    uploadProfile,
    validateUploadProfile
} = require('../controller/user.controller');


// REGISTER USER
userRoute.post('/register-user', validateRegisterUser , registerUser);

// LOGIN USER
userRoute.post('/login-user', validateLoginUser ,loginUser);

// GET ALL USER
userRoute.get('/get-all-user', getAllUser);

// GET SPECIFIC USER
userRoute.get('/get-specific-user' , validateGetUser ,getUser);

// UPDATE USER
userRoute.put('/update-user', validateUpdateUser ,updateUser);

// DELETE USER
userRoute.delete('/delete-user', validateDeleteUser ,deleteUser);

// UPDATE PASSWORD
userRoute.put('/update-password', validateUpdatePassword ,updatePassword);

// UPLOAD PROFILE
userRoute.post('/upload-profile', upload , validateUploadProfile ,uploadProfile);

module.exports = userRoute;