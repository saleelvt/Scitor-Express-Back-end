import { IAdminDependencies } from "@/application/admin/interfaces/IAdminDependencies";
import { NextFunction, Request, Response } from "express";
import { Course } from "@/infrastructure/database/models/adminCourseSchema";

export const adminAddCourseController = (dependencies: IAdminDependencies) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void | null | any> => {
        try {
            const { courseName, courseNameAr, description, descriptionAr, imageUrl, status } = req.body;

            console.log("add course api got it bor ",courseName);
            

            // Basic validation - check if all required fields are provided
            if (!courseName || !courseNameAr || !imageUrl) {
                return res.status(400).json({ 
                    success: false, 
                    message: "All fields are required" 
                });
            }

            // Trim whitespace from all string fields
            const trimmedCourseName = courseName.trim();
            const trimmedCourseNameAr = courseNameAr.trim();
            const trimmedDescription = description.trim();
            const trimmedDescriptionAr = descriptionAr.trim();
            const trimmedImageUrl = imageUrl.trim();

            // Check if fields are empty after trimming
            if (!trimmedCourseName || !trimmedCourseNameAr || !trimmedImageUrl) {
                return res.status(400).json({ 
                    success: false, 
                    message: "All fields must contain valid content" 
                });
            }

            // Check if course with same English name already exists
            const existingCourseByName = await Course.findOne({ 
                courseName: { $regex: new RegExp(`^${trimmedCourseName}$`, 'i') } 
            });

            if (existingCourseByName) {
                return res.status(409).json({ 
                    success: false, 
                    message: "A course with this English name already exists" 
                });
            }

            // Check if course with same Arabic name already exists
            const existingCourseByNameAr = await Course.findOne({ 
                courseNameAr: trimmedCourseNameAr 
            });

            if (existingCourseByNameAr) {
                return res.status(409).json({ 
                    success: false, 
                    message: "A course with this Arabic name already exists" 
                });
            }

            // Validate status if provided
            const validStatus = status && ['active', 'inactive'].includes(status) ? status : 'active';

            // Create new course
            const newCourse = new Course({
                courseName: trimmedCourseName,
                courseNameAr: trimmedCourseNameAr,
                description: trimmedDescription,
                descriptionAr: trimmedDescriptionAr,
                imageUrl: trimmedImageUrl,
                status: validStatus
            });

            // Save course to database
            const savedCourse = await newCourse.save();

            return res.status(201).json({ 
                success: true, 
                message: "Course created successfully",
                data: {
                    id: savedCourse._id,
                    courseName: savedCourse.courseName,
                    courseNameAr: savedCourse.courseNameAr,
                    status: savedCourse.status,
                    createdAt: savedCourse.createdAt
                }
            });

        } catch (error: any) {
            console.error("Failed to create course:", error);

            // Handle MongoDB validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                return res.status(400).json({ 
                    success: false, 
                    message: "Validation failed", 
                    errors: validationErrors 
                });
            }

            // Handle MongoDB duplicate key error
            if (error.code === 11000) {
                return res.status(409).json({ 
                    success: false, 
                    message: "Course already exists" 
                });
            }

            next(error);
        }
    };
};