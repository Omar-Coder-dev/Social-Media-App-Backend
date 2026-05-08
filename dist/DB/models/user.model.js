"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_type_1 = require("../../modules/users/user.type");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    gender: {
        type: Number,
        enum: [user_type_1.GenderEnum.male, user_type_1.GenderEnum.female],
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    changedCredentialsAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isProvier: {
        type: Number,
        default: user_type_1.ProviderEnum.system,
        enum: [user_type_1.ProviderEnum.system, user_type_1.ProviderEnum.google],
    },
}, {
    timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
    toObject: {
        virtuals: true,
        getters: true,
    }
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map