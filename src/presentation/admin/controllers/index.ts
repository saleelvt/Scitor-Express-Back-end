import { adminGetUsersController } from './getVerifiedUsers';
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { loginAdminController } from "./adminLogin";
import { addVerifiedUserController } from "./addVerifiedUser";
import { adminDeleteUserController } from './deleteUser';



// user imports 

import { userLoginController } from './user/loginUser';



export const adminController = (dependencies: IAdminDependencies) => {
    return {
        loginAdmin: loginAdminController(dependencies), // No change needed here.
        addVerifiedUser:addVerifiedUserController(dependencies),
        getVerifiedUsers:adminGetUsersController(dependencies),
        DeleteVerifiedUser:adminDeleteUserController(dependencies),



        // user section 

        loginUser:userLoginController(dependencies),
    };
};
