"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const getVerifiedUsers_1 = require("./getVerifiedUsers");
const adminLogin_1 = require("./adminLogin");
const addVerifiedUser_1 = require("./addVerifiedUser");
const deleteUser_1 = require("./deleteUser");
const addCourse_1 = require("./addCourse");
const getCourse_1 = require("./getCourse");
const getCourseByid_1 = require("./getCourseByid");
const addDetailedCourse_1 = require("./addDetailedCourse");
const deleteDetailedCourse_1 = require("./deleteDetailedCourse");
// user imports 
const loginUser_1 = require("./user/loginUser");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies), // No change needed here.
        addVerifiedUser: (0, addVerifiedUser_1.addVerifiedUserController)(dependencies),
        getVerifiedUsers: (0, getVerifiedUsers_1.adminGetUsersController)(dependencies),
        DeleteVerifiedUser: (0, deleteUser_1.adminDeleteUserController)(dependencies),
        // user section 
        loginUser: (0, loginUser_1.userLoginController)(dependencies),
        AddCourse: (0, addCourse_1.adminAddCourseController)(dependencies),
        getCourse: (0, getCourse_1.adminGetCourseController)(dependencies),
        getCoursebyId: (0, getCourseByid_1.adminGetCoursebyIdController)(dependencies),
        AddDetailedCourse: (0, addDetailedCourse_1.adminAddDetailedCourseController)(dependencies),
        deleteDetailedCourse: (0, deleteDetailedCourse_1.adminDeleteDetailedCourseByIdController)(dependencies)
    };
};
exports.adminController = adminController;
