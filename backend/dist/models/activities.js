"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ActivitesSchema = new Schema({
    thread_id: { type: String, required: true },
    answer_id: { type: Number, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    movie_id: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Activities", ActivitesSchema);
