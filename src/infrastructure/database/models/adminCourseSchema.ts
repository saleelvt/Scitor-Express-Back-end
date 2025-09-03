import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    courseName: { 
        type: String, 
        required: [true, 'Course name is required']
    },
    courseNameAr: { 
        type: String, 
        required: [true, 'Arabic course name is required']
    },
    description: { 
        type: String, 
        required: [true, 'Description is required']
    },
    descriptionAr: { 
        type: String, 
        required: [true, 'Arabic description is required']
    },
    imageUrl: { 
        type: String, 
        required: [true, 'Image URL is required']
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
});

export const Course = model("Course", courseSchema);