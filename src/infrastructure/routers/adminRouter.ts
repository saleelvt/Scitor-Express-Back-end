import { adminController } from '@/presentation/admin/controllers';
import { IAdminDependencies } from './../../application/admin/interfaces/IAdminDependencies';
import { Router } from 'express';

export const adminRoutes = (dependencies: IAdminDependencies) => {
    const { loginAdmin,addVerifiedUser,getVerifiedUsers,DeleteVerifiedUser,loginUser,AddCourse,getCourse,getCoursebyId } = adminController(dependencies);
    const router = Router();
    router.route("/login").post(loginAdmin);
    router.route("/addUser").post(addVerifiedUser);
    router.route("/getUsers").get(getVerifiedUsers);
    router.route("/deleteUser/:id").delete(DeleteVerifiedUser);


    // user section 


        router.route("/userlogin").post(loginUser);

        router.route("/addCourse").post(AddCourse);
        router.route("/getCourse").get(getCourse);
        router.route("/getCourseById/:id").get(getCoursebyId);



  

    return router;
};
