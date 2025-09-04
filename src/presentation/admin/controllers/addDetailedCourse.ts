import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Course } from "@/infrastructure/database/models/adminCourseSchema";
import { Lesson } from "@/infrastructure/database/models/adminDetailedCourseSchema";

export const adminAddDetailedCourseController = (dependencies: IAdminDependencies) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const {
                courseId,
                lessonTitle,
                lessonTitleAr,
                lessonNumber,
                lessonDate,
                youtubeUrl,
                thumbnailUrl,
                lessonDuration
            } = req.body;

            console.log("my req.body of the lesson aading : ", req.body);
            

            // Basic validation
            if (!courseId || !lessonTitle || !lessonTitleAr || !lessonNumber || 
                !lessonDate || !youtubeUrl || !thumbnailUrl || !lessonDuration) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // Check if course exists
            const courseExists = await Course.findById(courseId);
            if (!courseExists) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }

            // Check if lesson number already exists for this course
            const existingLesson = await Lesson.findOne({ 
                courseId: courseId, 
                lessonNumber: lessonNumber 
            });
            
            if (existingLesson) {
                return res.status(400).json({
                    success: false,
                    message: "Lesson number already exists for this course"
                });
            }

            // Create new lesson
            const newLesson = new Lesson({
                courseId,
                lessonTitle,
                lessonTitleAr,
                lessonNumber,
                lessonDate: new Date(lessonDate),
                youtubeUrl,
                thumbnailUrl,
                lessonDuration
            });

            // Save lesson to database
            const savedLesson = await newLesson.save();

            return res.status(201).json({
                success: true,
                message: "Lesson added successfully",
                data: savedLesson
            });

        } catch (error: any) {
            console.error("Failed to create lesson:", error);
            
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    };
};