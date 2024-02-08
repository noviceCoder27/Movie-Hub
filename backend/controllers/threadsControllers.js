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
exports.__esModule = true;
exports.getThread = exports.getUserThreads = exports.getThreads = void 0;
var threads_1 = require("./../models/threads");
var user_1 = require("./../models/user");
var userControllers_1 = require("./userControllers");
var getThreads = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movie_id, threads, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movie_id = req.headers.movie_id;
                if (!movie_id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, threads_1["default"].find({ movie_id: movie_id })];
            case 2:
                threads = _a.sent();
                res.status(201).json(threads);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json({ msg: "Error getting threads" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ msg: "Enter valid movie" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getThreads = getThreads;
var getUserThreads = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, threadIDs, threads, _i, threadIDs_1, threadID, thread, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, userControllers_1.getUserID)(req);
                if (!_id) return [3 /*break*/, 13];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 9];
                threadIDs = user.threads;
                if (!threadIDs) return [3 /*break*/, 7];
                threads = [];
                _i = 0, threadIDs_1 = threadIDs;
                _a.label = 3;
            case 3:
                if (!(_i < threadIDs_1.length)) return [3 /*break*/, 6];
                threadID = threadIDs_1[_i];
                return [4 /*yield*/, threads_1["default"].findOne({ _id: threadID })];
            case 4:
                thread = _a.sent();
                threads.push(thread);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.status(201).json(threads);
                return [3 /*break*/, 8];
            case 7:
                res.status(201).json({ msg: [] });
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                res.status(400).json({ msg: "No user" });
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                err_2 = _a.sent();
                res.status(400).json({ msg: "Error getting threads" });
                return [3 /*break*/, 12];
            case 12: return [3 /*break*/, 14];
            case 13:
                res.status(400).json({ msg: "Invalid User" });
                _a.label = 14;
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.getUserThreads = getUserThreads;
var getThread = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var thread_id, _id, thread, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                thread_id = req.headers.thread_id;
                if (!thread_id) return [3 /*break*/, 5];
                _id = thread_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _a.sent();
                res.status(201).json(thread);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({ msg: "Error getting thread" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ msg: "Inavlid thread" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getThread = getThread;