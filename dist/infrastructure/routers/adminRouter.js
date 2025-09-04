"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const adminRoutes = (dependencies) => {
    const { loginAdmin, addVerifiedUser, getVerifiedUsers, DeleteVerifiedUser, loginUser, AddCourse, getCourse, getCoursebyId, AddDetailedCourse, deleteDetailedCourse } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin);
    router.route("/addUser").post(addVerifiedUser);
    router.route("/getUsers").get(getVerifiedUsers);
    router.route("/deleteUser/:id").delete(DeleteVerifiedUser);
    // user section 
    router.route("/userlogin").post(loginUser);
    router.route("/addCourse").post(AddCourse);
    router.route("/getCourse").get(getCourse);
    router.route("/getCourseById/:id").get(getCoursebyId);
    router.route("/addLesson").post(AddDetailedCourse);
    router.route("/DeleteDetailedCourse/:id").delete(deleteDetailedCourse);
    return router;
};
exports.adminRoutes = adminRoutes;
