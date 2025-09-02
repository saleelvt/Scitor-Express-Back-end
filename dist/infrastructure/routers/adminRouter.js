"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const adminRoutes = (dependencies) => {
    const { loginAdmin, addVerifiedUser, getVerifiedUsers, DeleteVerifiedUser, loginUser } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin);
    router.route("/addUser").post(addVerifiedUser);
    router.route("/getUsers").get(getVerifiedUsers);
    router.route("/deleteUser/:id").delete(DeleteVerifiedUser);
    // user section 
    router.route("/userlogin").post(loginUser);
    return router;
};
exports.adminRoutes = adminRoutes;
