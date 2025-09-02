import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const loginAdminUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { adminFindByEmail },
  } = dependencies;

  return {
    execute: async (email: string, password: string) => {
      try {
        const admin = await adminFindByEmail(email);

        // If admin not found, return null
        if (!admin) {
          return null;
        }

        // Plain text comparison
        if (password !== admin.password) {
          return null;
        }

        return admin;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  };
};
