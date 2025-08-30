"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminLogin_1 = require("./adminLogin");
const adminController = (dependencies) => {
    return {
        loginAdmin: (0, adminLogin_1.loginAdminController)(dependencies), // No change needed here.
    };
};
exports.adminController = adminController;
