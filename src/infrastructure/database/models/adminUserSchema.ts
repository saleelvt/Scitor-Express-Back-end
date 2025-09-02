import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], minlength: 3, maxlength: 50 },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'], 
        match: [/^\d{10,15}$/, 'Invalid phone number'] 
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    }
}, {
    timestamps: true
});

export const User = model("User", userSchema);
