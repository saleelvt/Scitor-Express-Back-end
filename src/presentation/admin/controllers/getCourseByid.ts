import { NextFunction, Request, Response } from "express";
import { Course } from "@/infrastructure/database/models/adminCourseSchema";
import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { Lesson } from "@/infrastructure/database/models/adminDetailedCourseSchema";

// Controller: Admin Get Course by ID with Lessons
export const adminGetCoursebyIdController = (dependencies: IAdminDependencies) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void|any|null> => {
        try {
            // Get course ID from request parameters
            const { id } = req.params;

            // Fetch course from the database
            const course = await Course.findById(id);

            if (!course) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Course not found" 
                });
            }

            // Fetch lessons associated with this course
            const lessons = await Lesson.find({ courseId: id }).sort({ lessonNumber: 1 });

            // Combine course data with its lessons
            const courseWithLessons = {
                ...course.toObject(),
                lessons: lessons
            };

            // Successful response with course and lesson data
            return res.status(200).json({ 
                success: true, 
                message: "Course and lessons fetched successfully", 
                data: courseWithLessons 
            });
        } catch (error) {
            console.error("Failed to fetch course and lessons:", error);
            next(error);
        }
    };
};