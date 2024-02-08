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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createActivity = exports.getUserActivities = void 0;
var userControllers_1 = require("./userControllers");
var activities_1 = require("./../models/activities");
var user_1 = require("./../models/user");
var threads_1 = require("./../models/threads");
var getUserActivities = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, activities, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, userControllers_1.getUserID)(req);
                if (!_id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, activities_1["default"].find({ user_id: _id })];
            case 2:
                activities = _a.sent();
                res.status(200).json(activities);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(404).json({ msg: "No activities" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ msg: "Unauthorized access" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getUserActivities = getUserActivities;
var createActivity = function (req, res, thread_id, answer_id, content) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, thread, movie_id, activity, user, activities, updatedActivities, err_2, err_3, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, userControllers_1.getUserID)(req);
                return [4 /*yield*/, threads_1["default"].findOne({ _id: thread_id })];
            case 1:
                thread = _a.sent();
                if (!(thread_id && (answer_id !== undefined || null) && _id && thread)) return [3 /*break*/, 14];
                movie_id = thread.movie_id;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 13]);
                return [4 /*yield*/, activities_1["default"].create({ thread_id: thread_id, answer_id: answer_id, user_id: _id, content: content, movie_id: movie_id })];
            case 3:
                activity = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 10, , 11]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 5:
                user = _a.sent();
                activities = user.activities;
                updatedActivities = activities;
                if (activities) {
                    if (!activities.length) {
                        updatedActivities = [String(activity._id)];
                    }
                    else {
                        updatedActivities = __spreadArray(__spreadArray([], activities, true), [String(activity._id)], false);
                    }
                }
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(_id, { activities: updatedActivities }, { "new": true })];
            case 7:
                _a.sent();
                return [2 /*return*/, true];
            case 8:
                err_2 = _a.sent();
                return [2 /*return*/, false];
            case 9: return [3 /*break*/, 11];
            case 10:
                err_3 = _a.sent();
                return [2 /*return*/, false];
            case 11: return [3 /*break*/, 13];
            case 12:
                err_4 = _a.sent();
                return [2 /*return*/, false];
            case 13: return [3 /*break*/, 15];
            case 14: return [2 /*return*/, false];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.createActivity = createActivity;
