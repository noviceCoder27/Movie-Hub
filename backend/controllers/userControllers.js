"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.dislikeComment = exports.likeComment = exports.dislikeAnswer = exports.likeAnswer = exports.addComment = exports.addAnswer = exports.addThread = exports.disableNotify = exports.updateUserCredentials = exports.getUserInfo = exports.login = exports.register = exports.getUserID = void 0;
var user_1 = require("./../models/user");
var threads_1 = require("./../models/threads");
var jsonwebtoken_1 = require("jsonwebtoken");
var activityControllers_1 = require("./activityControllers");
var getUserID = function (req) {
    var userStr = req.headers["user"];
    if (typeof userStr === "string") {
        var user = JSON.parse(userStr);
        return user._id;
    }
    return null;
};
exports.getUserID = getUserID;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, email, password, user, createdUser, secret, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1["default"].register(userName, email, password)];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 6];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user_1["default"].create(__assign(__assign({}, user), { notify: false }))];
            case 3:
                createdUser = _b.sent();
                secret = process.env.SECRET;
                token = jsonwebtoken_1["default"].sign({ _id: createdUser._id }, secret, { expiresIn: "2h" });
                res.status(201).json({ msg: "User created sucessfully", token: token });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(400).json({ msg: "Failed to register" });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ msg: "Failed to register" });
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, email, password, user, secret, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userName = _a.userName, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].login(userName, email, password)];
            case 2:
                user = _b.sent();
                if (user) {
                    secret = process.env.SECRET;
                    token = jsonwebtoken_1["default"].sign({ _id: user._id }, secret, { expiresIn: "2h" });
                    res.status(201).json({ msg: "User logged in successfully", token: token });
                }
                else {
                    res.status(400).json({ msg: "Failed to login" });
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status(400).json({ msg: "User not found" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getUserInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, userName, email, notify, profilePicture, userDetails, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, exports.getUserID)(req);
                if (!_id) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                user = _a.sent();
                if (user) {
                    userName = user.userName, email = user.email, notify = user.notify, profilePicture = user.profilePicture;
                    userDetails = { userName: userName, email: email, notify: notify, profilePicture: profilePicture };
                    res.status(201).json(userDetails);
                }
                else {
                    res.status(400).json({ msg: "No user" });
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({ msg: "Error finding user" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({ msg: "Invalid user id" });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
var updateUserCredentials = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, _a, userName, email, profilePicture, user, err_4, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _id = (0, exports.getUserID)(req);
                _a = req.body, userName = _a.userName, email = _a.email, profilePicture = _a.profilePicture;
                if (!_id) return [3 /*break*/, 11];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                user = _b.sent();
                if (!user) return [3 /*break*/, 7];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(_id, { userName: userName, email: email, profilePicture: profilePicture }, { "new": true })];
            case 4:
                _b.sent();
                res.status(200).json({ msg: 'User credentials updated successfully' });
                return [3 /*break*/, 6];
            case 5:
                err_4 = _b.sent();
                res.status(400).json({ msg: 'No user found' });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(400).json({ msg: 'No user found' });
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_5 = _b.sent();
                res.status(400).json({ msg: 'Error updating user credentials' });
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(400).json({ msg: 'Invalid User' });
                _b.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.updateUserCredentials = updateUserCredentials;
var disableNotify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, err_6, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = (0, exports.getUserID)(req);
                if (!_id) return [3 /*break*/, 11];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(_id, { notify: false }, { "new": true })];
            case 4:
                _a.sent();
                res.status(200).json({ msg: 'Notify turned false' });
                return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                res.status(400).json({ msg: 'No user found' });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(400).json({ msg: 'No user found' });
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_7 = _a.sent();
                res.status(400).json({ msg: 'Error occured' });
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(400).json({ msg: 'Invalid User' });
                _a.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.disableNotify = disableNotify;
var enableNotify = function (req, res, _id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_8, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!_id) return [3 /*break*/, 9];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 6];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(_id, { notify: true }, { "new": true })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                console.log(err_8);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_9 = _a.sent();
                console.log(err_9);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                res.status(400).json({ msg: 'Invalid User' });
                _a.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
var addThread = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, movie_id, _id, threadExists, creatorExists, discussion_box, thread, threads, err_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, movie_id = _a.movie_id;
                _id = (0, exports.getUserID)(req);
                return [4 /*yield*/, threads_1["default"].findOne({ title: title, description: description })];
            case 1:
                threadExists = _b.sent();
                return [4 /*yield*/, user_1["default"].findOne({ _id: _id })];
            case 2:
                creatorExists = _b.sent();
                if (!threadExists) return [3 /*break*/, 3];
                res.status(400).json({ msg: "Duplicate thread" });
                return [3 /*break*/, 13];
            case 3:
                if (!!creatorExists) return [3 /*break*/, 4];
                res.status(400).json({ msg: "Invalid User" });
                return [3 /*break*/, 13];
            case 4:
                if (!(title && description && _id)) return [3 /*break*/, 12];
                discussion_box = { answers: [] };
                _b.label = 5;
            case 5:
                _b.trys.push([5, 10, , 11]);
                return [4 /*yield*/, threads_1["default"].create({ title: title, description: description, creator_id: _id, creator_name: creatorExists.userName, movie_id: movie_id, discussion_box: discussion_box })];
            case 6:
                thread = _b.sent();
                threads = creatorExists.threads;
                if (!threads) return [3 /*break*/, 8];
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(_id, { threads: __spreadArray(__spreadArray([], threads, true), [thread._id], false) }, { "new": true })];
            case 7:
                _b.sent();
                res.status(201).json(thread);
                return [3 /*break*/, 9];
            case 8:
                res.status(400).json({ msg: "Error updating threads in user" });
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err_10 = _b.sent();
                res.status(400).json({ msg: "Failed to create thread" });
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 13];
            case 12:
                res.status(400).json({ msg: "Invalid input received" });
                _b.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.addThread = addThread;
var addAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, content, likes, dislikes, answer_id, _id, user_id, creatorExists, thread, discussion_box, answers, time, answer, thread_1, creator_id, actvity, err_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, content = _a.content;
                likes = 0;
                dislikes = 0;
                answer_id = 0;
                _id = thread_id;
                user_id = (0, exports.getUserID)(req);
                return [4 /*yield*/, user_1["default"].findOne({ _id: user_id })];
            case 1:
                creatorExists = _b.sent();
                return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _b.sent();
                if (!!thread) return [3 /*break*/, 3];
                res.status(400).json({ msg: "Thread doesn't exist " });
                return [3 /*break*/, 12];
            case 3:
                if (!(content && user_id)) return [3 /*break*/, 11];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                if (answers.length !== 0) {
                    answer_id = answers[answers.length - 1].answer_id + 1;
                }
                if (creatorExists) {
                    time = new Date();
                    answer = { content: content, comments: [], likes: likes, dislikes: dislikes, user_id: user_id, answer_id: answer_id, user_name: creatorExists.userName, createdAt: time };
                    answers.push(answer);
                }
                _b.label = 4;
            case 4:
                _b.trys.push([4, 9, , 10]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 5:
                thread_1 = _b.sent();
                if (!thread_1) return [3 /*break*/, 8];
                creator_id = thread_1.creator_id;
                return [4 /*yield*/, user_1["default"].findByIdAndUpdate(creator_id, { notify: true }, { "new": true })];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Someone added an answer")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_1 === null || thread_1 === void 0 ? void 0 : thread_1.creator_id);
                    res.status(201).json(thread_1);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_11 = _b.sent();
                res.status(400).json({ msg: "Thread doesn't exist " });
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(400).json({ msg: "Invalid input received" });
                _b.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.addAnswer = addAnswer;
var addComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, answer_id, content, likes, dislikes, comment_id, _id, user_id, thread, discussion_box, answers, creatorExists, answer, comments, time, comment, thread_2, user_id_1, actvity, err_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, answer_id = _a.answer_id, content = _a.content;
                likes = 0;
                dislikes = 0;
                comment_id = 0;
                _id = thread_id;
                user_id = (0, exports.getUserID)(req);
                return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 1:
                thread = _b.sent();
                if (!!thread) return [3 /*break*/, 2];
                res.status(400).json({ msg: "Thread doesn't exist " });
                return [3 /*break*/, 13];
            case 2:
                if (!(content && user_id)) return [3 /*break*/, 12];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                return [4 /*yield*/, user_1["default"].findOne({ _id: user_id })];
            case 3:
                creatorExists = _b.sent();
                answer = answers.find(function (answer) { return answer.answer_id === Number(answer_id); });
                if (!(answer && creatorExists)) return [3 /*break*/, 10];
                comments = answer.comments;
                if (comments.length !== 0) {
                    comment_id = comments[comments.length - 1].comment_id + 1;
                }
                time = new Date();
                comment = { content: content, likes: likes, dislikes: dislikes, comment_id: comment_id, user_id: user_id, user_name: creatorExists.userName, createdAt: time };
                comments.push(comment);
                answers[answer_id].comments = comments;
                _b.label = 4;
            case 4:
                _b.trys.push([4, 8, , 9]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 5:
                thread_2 = _b.sent();
                user_id_1 = answer.user_id;
                return [4 /*yield*/, user_1["default"].findOneAndUpdate({ _id: user_id_1 }, { notify: true })];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "You got a reply")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_2 === null || thread_2 === void 0 ? void 0 : thread_2.creator_id);
                    res.status(201).json(thread_2);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                return [3 /*break*/, 9];
            case 8:
                err_12 = _b.sent();
                res.status(400).json({ msg: "Thread doesn't exist" });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({ msg: "Answer not found" });
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                res.status(400).json({ msg: "Invalid input received" });
                _b.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
var likeAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, answer_id, _id, thread, discussion_box, answers, answer, thread_3, user_id, actvity, err_13;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, answer_id = _a.answer_id;
                _id = thread_id;
                if (!!thread_id) return [3 /*break*/, 1];
                res.status(400).json({ msg: "Invalid request" });
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _b.sent();
                if (!thread) return [3 /*break*/, 10];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                answer = answers.find(function (answer) { return answer.answer_id === Number(answer_id); });
                answers[answer_id].likes++;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 4:
                thread_3 = _b.sent();
                if (!answer) return [3 /*break*/, 6];
                user_id = answer.user_id;
                return [4 /*yield*/, user_1["default"].findOneAndUpdate({ _id: user_id }, { notify: true })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your answer got a like")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_3 === null || thread_3 === void 0 ? void 0 : thread_3.creator_id);
                    res.status(201).json(thread_3);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                return [3 /*break*/, 9];
            case 8:
                err_13 = _b.sent();
                res.status(400).json({ msg: "Error updating thread " });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({ msg: "Thread doesn't exist " });
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.likeAnswer = likeAnswer;
var dislikeAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, answer_id, _id, thread, discussion_box, answers, answer, thread_4, user_id, actvity, err_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, answer_id = _a.answer_id;
                _id = thread_id;
                if (!!thread_id) return [3 /*break*/, 1];
                res.status(400).json({ msg: "Invalid request" });
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _b.sent();
                if (!thread) return [3 /*break*/, 10];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                answer = answers.find(function (answer) { return answer.answer_id === Number(answer_id); });
                answers[answer_id].likes--;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 4:
                thread_4 = _b.sent();
                if (!answer) return [3 /*break*/, 6];
                user_id = answer.user_id;
                return [4 /*yield*/, user_1["default"].findOneAndUpdate({ _id: user_id }, { notify: true })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your answer got a dislike")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_4 === null || thread_4 === void 0 ? void 0 : thread_4.creator_id);
                    res.status(201).json(thread_4);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                return [3 /*break*/, 9];
            case 8:
                err_14 = _b.sent();
                res.status(400).json({ msg: "Error updating thread " });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({ msg: "Thread doesn't exist " });
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.dislikeAnswer = dislikeAnswer;
var likeComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, answer_id, comment_id, _id, thread, discussion_box, answers, comments, comment, thread_5, user_id, actvity, err_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, answer_id = _a.answer_id, comment_id = _a.comment_id;
                _id = thread_id;
                if (!!thread_id) return [3 /*break*/, 1];
                res.status(400).json({ msg: "Invalid request" });
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _b.sent();
                if (!thread) return [3 /*break*/, 10];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                comments = answers[answer_id].comments;
                comment = comments.find(function (comment) { return comment.comment_id === Number(comment_id); });
                comments[comment_id].likes++;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 4:
                thread_5 = _b.sent();
                if (!comment) return [3 /*break*/, 6];
                user_id = comment.user_id;
                return [4 /*yield*/, user_1["default"].findOneAndUpdate({ _id: user_id }, { notify: true })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your comment got a like")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_5 === null || thread_5 === void 0 ? void 0 : thread_5.creator_id);
                    res.status(201).json(thread_5);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                return [3 /*break*/, 9];
            case 8:
                err_15 = _b.sent();
                res.status(400).json({ msg: "Error updating thread " });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({ msg: "Thread doesn't exist " });
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.likeComment = likeComment;
var dislikeComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, thread_id, answer_id, comment_id, _id, thread, discussion_box, answers, comments, comment, thread_6, user_id, actvity, err_16;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, thread_id = _a.thread_id, answer_id = _a.answer_id, comment_id = _a.comment_id;
                _id = thread_id;
                if (!!thread_id) return [3 /*break*/, 1];
                res.status(400).json({ msg: "Invalid request" });
                return [3 /*break*/, 11];
            case 1: return [4 /*yield*/, threads_1["default"].findOne({ _id: _id })];
            case 2:
                thread = _b.sent();
                if (!thread) return [3 /*break*/, 10];
                discussion_box = thread.discussion_box;
                answers = discussion_box.answers;
                comments = answers[answer_id].comments;
                comment = comments.find(function (comment) { return comment.comment_id === Number(comment_id); });
                comments[comment_id].likes--;
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, , 9]);
                return [4 /*yield*/, threads_1["default"].findByIdAndUpdate(_id, { discussion_box: { answers: answers } }, { "new": true })];
            case 4:
                thread_6 = _b.sent();
                if (!comment) return [3 /*break*/, 6];
                user_id = comment.user_id;
                return [4 /*yield*/, user_1["default"].findOneAndUpdate({ _id: user_id }, { notify: true })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your comment got a dislike")];
            case 7:
                actvity = _b.sent();
                if (actvity) {
                    enableNotify(req, res, thread_6 === null || thread_6 === void 0 ? void 0 : thread_6.creator_id);
                    res.status(201).json(thread_6);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
                return [3 /*break*/, 9];
            case 8:
                err_16 = _b.sent();
                res.status(400).json({ msg: "Error updating thread " });
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                res.status(400).json({ msg: "Thread doesn't exist " });
                _b.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.dislikeComment = dislikeComment;
