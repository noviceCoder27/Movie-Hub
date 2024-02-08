"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var ThreadsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator_id: { type: String, required: true },
    creator_name: { type: String, required: true },
    movie_id: { type: String, required: true },
    discussion_box: { type: Object, required: true }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("Threads", ThreadsSchema);
