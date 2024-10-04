// REGISTER USER
module.exports.validateUser = (res) => {
    return res.status(400).json({
        error: true,
        code: 400,
        message: 'Validation failed.',
        errors: errors.array(),
      });
}

module.exports.errorRegisterUser = (res) => {
    return res.status(500).json({
        error: true,
        code: 500,
        message: `Error registering user...`,
      });
}

module.exports.userAddSuccess = (res) => {
    res.status(201).json({
        error: false,
        code: 201,
        message: `New User Added Successfully...`,
        data: {
          user: {
            id: results.insertId,
            name: newUser.name,
            email: newUser.email,
          },
        },
      });
}

module.exports.internalServerError = (res) =>{
    res.status(500).json({
        error: true,
        code: 500,
        message: `Internal Server Error...`,
      });
}

// LOGIN USER

module.exports.loginValidate = (res) => {
    return res.status(400).json({
        error: true,
        code: 400,
        message: 'Validation failed.',
        errors: errors.array(),
      });
}

module.exports.emailNotFound = (res) => {
    return res.status(400).json({
        error: true,
        code: 400,
        message: `Email Not Found...`,
        data: null,
      });
}

module.exports.passwordNotMatch = (res) => {
    return res.status(401).json({
        error: true,
        code: 401,
        message: `Password Not Match...`,
        data: null,
      });
}

module.exports.userLoginSuccess = (res) => {
    
    res.status(200).json({
        error: false,
        code: 200,
        token,
        message: `User Login Successfully..`,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      });
}

// GET ALL USER
module.exports.userDataNotFound = (res) => {
    return res.status(404).json({
        error: true,
        code: 404,
        message: `User's Data Not Found..!`,
        data: null,
      });
}

module.exports.userDataSuccess = (res) => {
    res.status(200).json({
        error: false,
        code: 200,
        message: `User's Data Retrieved Successfully...`,
        data: results,                 
      });
}

module.exports.userNotFound = (res) => {
    res.status(404).json({
        error: true,
        code: 404,
        message: `User Not Found`,
      });
}

// UPDATE USER
module.exports.userUpdateSuccess = (res) => {
    res.status(200).json({
        error: false,
        code:200,
        message: 'User Details Updated Successfully...',
        data: {
          user: {
            id: userId,
            name,
            email
          },
        },
      });
}

// DELETE USER
module.exports.userDeleteSuccess = (res) => {
    res.status(200).json({
        error: false,
        code: 200,
        message: 'User Deleted Successfully...',
        data: {
          user: {
            id: deletedUser.id,
            name: deletedUser.name,
            email: deletedUser.email,
            isDelete: deletedUser.isDelete,
          }
        }
      });
}

// UPDATE PASSWORD
module.exports.oldPasswordNotMatch = (res) => {
    return res.status(401).json({
        error: true,
        status: 401,
        message: 'Old password does not match...' });
}

module.exports.newOldPassNotMatch = (res) => {
    return res.status(400).json({
        error: true,
        status: 400,
        message: 'New password cannot be the same as the old password...' });
}

module.exports.newComfirmPassNotMatch = (res) => {
    return res.status(400).json({
        error: true,
        status: 400,
        message: 'New password and confirm password do not match...' });
}

module.exports.passChangeSuccess = (res) => {
    res.status(200).json({
        statusCode: 200,
        error: false,
        message: 'Password changed successfully...',
        data: updatedUser[0] 
      });
}

// PROFILE UPLOAD
module.exports.profilePictureUpSuccess = (res) => {
    res.status(200).json({
        status: 200,
        error: false,
        message: 'Profile picture uploaded successfully...',
        data: { profilePicturePath }
    });
}



