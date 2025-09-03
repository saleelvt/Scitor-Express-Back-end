import { NextFunction, Request, Response } from "express";
import { Course } from "@/infrastructure/database/models/adminCourseSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";

// Controller: Admin Get All course
export const adminGetCoursebyIdController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            // Fetch all course from the database
            const { id } = req.params;


            const course = await Course.findById(id);
   

            // Successful response with user data
            return res.status(200).json({ success: true, message: "course fetched successfully", data: course });
        } catch (error) {
            console.error("Failed to fetch course:", error);
            next(error);
        }
    };
};
