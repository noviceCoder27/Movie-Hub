"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.getUserActivities = void 0;
const userControllers_1 = require("./userControllers");
const activities_1 = __importDefault(require("./../models/activities"));
const user_1 = __importDefault(require("./../models/user"));
const threads_1 = __importDefault(require("./../models/threads"));
const getUserActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, userControllers_1.getUserID)(req);
    if (_id) {
        try {
            const activities = yield activities_1.default.find({ user_id: _id });
            res.status(200).json(activities);
        }
        catch (err) {
            res.status(404).json({ msg: "No activities" });
        }
    }
    else {
        res.status(400).json({ msg: "Unauthorized access" });
    }
});
exports.getUserActivities = getUserActivities;
const createActivity = (req, res, thread_id, answer_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, userControllers_1.getUserID)(req);
    const thread = yield threads_1.default.findOne({ _id: thread_id });
    if (thread_id && (answer_id !== undefined || null) && _id && thread) {
        const { movie_id } = thread;
        try {
            const activity = yield activities_1.default.create({ thread_id, answer_id, user_id: _id, content, movie_id });
            try {
                const user = yield user_1.default.findOne({ _id });
                const { activities } = user;
                let updatedActivities = activities;
                if (activities) {
                    if (!activities.length) {
                        updatedActivities = [String(activity._id)];
                    }
                    else {
                        updatedActivities = [...activities, String(activity._id)];
                    }
                }
                try {
                    yield user_1.default.findByIdAndUpdate(_id, { activities: updatedActivities }, { new: true });
                    return true;
                }
                catch (err) {
                    return false;
                }
            }
            catch (err) {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }
    else {
        return false;
    }
});
exports.createActivity = createActivity;
