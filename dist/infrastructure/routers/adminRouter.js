"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const controllers_1 = require("@/presentation/admin/controllers");
const express_1 = require("express");
const adminRoutes = (dependencies) => {
    const { loginAdmin } = (0, controllers_1.adminController)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/login").post(loginAdmin); // No need to change this line.
    return router;
};
exports.adminRoutes = adminRoutes;
