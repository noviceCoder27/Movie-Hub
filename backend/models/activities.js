"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var ActivitesSchema = new Schema({
    thread_id: { type: String, required: true },
    answer_id: { type: Number, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    movie_id: { type: String, required: true }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("Activities", ActivitesSchema);
