import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lessonTitle: {
        type: String,
        required: true
    },
    lessonTitleAr: {
        type: String,
        required: true
    },
    lessonNumber: {
        type: Number,
        required: true
    },
    lessonDate: {
        type: Date,
        required: true
    },
    youtubeUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    lessonDuration: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Lesson = model("Lesson", lessonSchema);