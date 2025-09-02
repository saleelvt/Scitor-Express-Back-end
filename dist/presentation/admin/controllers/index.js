"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const getVerifiedUsers_1 = require("./getVerifiedUsers");
const adminLogin_1 = require("./adminLogin");
const addVerifiedUser_1 = require("./addVerifiedUser");
const deleteUser_1 = require("./deleteUser");
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
    };
};
exports.adminController = adminController;
