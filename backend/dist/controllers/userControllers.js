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
exports.dislikeComment = exports.likeComment = exports.dislikeAnswer = exports.likeAnswer = exports.addComment = exports.addAnswer = exports.addThread = exports.disableNotify = exports.updateUserCredentials = exports.getUserInfo = exports.login = exports.register = exports.getUserID = void 0;
const user_1 = __importDefault(require("./../models/user"));
const threads_1 = __importDefault(require("./../models/threads"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const activityControllers_1 = require("./activityControllers");
const getUserID = (req) => {
    const userStr = req.headers["user"];
    if (typeof userStr === "string") {
        const user = JSON.parse(userStr);
        return user._id;
    }
    return null;
};
exports.getUserID = getUserID;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = yield user_1.default.register(userName, email, password);
    if (user) {
        try {
            const createdUser = yield user_1.default.create(Object.assign(Object.assign({}, user), { notify: false }));
            const secret = process.env.SECRET;
            const token = jsonwebtoken_1.default.sign({ _id: createdUser._id }, secret, { expiresIn: "2h" });
            res.status(201).json({ msg: "User created sucessfully", token });
        }
        catch (err) {
            res.status(400).json({ msg: "Failed to register" });
        }
    }
    else {
        res.status(400).json({ msg: "Failed to register" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const user = yield user_1.default.login(userName, email, password);
        if (user) {
            const secret = process.env.SECRET;
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, secret, { expiresIn: "2h" });
            res.status(201).json({ msg: "User logged in successfully", token });
        }
        else {
            res.status(400).json({ msg: "Failed to login" });
        }
    }
    catch (err) {
        res.status(400).json({ msg: "User not found" });
    }
});
exports.login = login;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, exports.getUserID)(req);
    if (_id) {
        try {
            const user = yield user_1.default.findOne({ _id });
            if (user) {
                const { userName, email, notify, profilePicture } = user;
                const userDetails = { userName, email, notify, profilePicture };
                res.status(201).json(userDetails);
            }
            else {
                res.status(400).json({ msg: "No user" });
            }
        }
        catch (err) {
            res.status(400).json({ msg: "Error finding user" });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid user id" });
    }
});
exports.getUserInfo = getUserInfo;
const updateUserCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, exports.getUserID)(req);
    const { userName, email, profilePicture } = req.body;
    if (_id) {
        try {
            const user = yield user_1.default.findOne({ _id });
            if (user) {
                try {
                    yield user_1.default.findByIdAndUpdate(_id, { userName, email, profilePicture }, { new: true });
                    res.status(200).json({ msg: 'User credentials updated successfully' });
                }
                catch (err) {
                    res.status(400).json({ msg: 'No user found' });
                }
            }
            else {
                res.status(400).json({ msg: 'No user found' });
            }
        }
        catch (err) {
            res.status(400).json({ msg: 'Error updating user credentials' });
        }
    }
    else {
        res.status(400).json({ msg: 'Invalid User' });
    }
});
exports.updateUserCredentials = updateUserCredentials;
const disableNotify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, exports.getUserID)(req);
    if (_id) {
        try {
            const user = yield user_1.default.findOne({ _id });
            if (user) {
                try {
                    yield user_1.default.findByIdAndUpdate(_id, { notify: false }, { new: true });
                    res.status(200).json({ msg: 'Notify turned false' });
                }
                catch (err) {
                    res.status(400).json({ msg: 'No user found' });
                }
            }
            else {
                res.status(400).json({ msg: 'No user found' });
            }
        }
        catch (err) {
            res.status(400).json({ msg: 'Error occured' });
        }
    }
    else {
        res.status(400).json({ msg: 'Invalid User' });
    }
});
exports.disableNotify = disableNotify;
const enableNotify = (req, res, _id) => __awaiter(void 0, void 0, void 0, function* () {
    if (_id) {
        try {
            const user = yield user_1.default.findOne({ _id });
            if (user) {
                try {
                    yield user_1.default.findByIdAndUpdate(_id, { notify: true }, { new: true });
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res.status(400).json({ msg: 'Invalid User' });
    }
});
const addThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, movie_id } = req.body;
    const _id = (0, exports.getUserID)(req);
    const threadExists = yield threads_1.default.findOne({ title, description });
    const creatorExists = yield user_1.default.findOne({ _id });
    if (threadExists) {
        res.status(400).json({ msg: "Duplicate thread" });
    }
    else if (!creatorExists) {
        res.status(400).json({ msg: "Invalid User" });
    }
    else if (title && description && _id) {
        const discussion_box = { answers: [] };
        try {
            const thread = yield threads_1.default.create({ title, description, creator_id: _id, creator_name: creatorExists.userName, movie_id, discussion_box });
            const { threads } = creatorExists;
            if (threads) {
                yield user_1.default.findByIdAndUpdate(_id, { threads: [...threads, thread._id] }, { new: true });
                res.status(201).json(thread);
            }
            else {
                res.status(400).json({ msg: "Error updating threads in user" });
            }
        }
        catch (err) {
            res.status(400).json({ msg: "Failed to create thread" });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid input received" });
    }
});
exports.addThread = addThread;
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, content } = req.body;
    const likes = 0;
    const dislikes = 0;
    let answer_id = 0;
    const _id = thread_id;
    const thread = yield threads_1.default.findOne({ _id });
    const user_id = (0, exports.getUserID)(req);
    const creatorExists = yield user_1.default.findOne({ _id: user_id });
    if (!thread) {
        res.status(400).json({ msg: "Thread doesn't exist " });
    }
    else if (content && user_id) {
        const { discussion_box } = thread;
        const { answers } = discussion_box;
        if (answers.length !== 0) {
            answer_id = answers[answers.length - 1].answer_id + 1;
        }
        if (creatorExists) {
            const time = new Date();
            const answer = { content, comments: [], likes, dislikes, user_id, answer_id, user_name: creatorExists.userName, createdAt: time };
            answers.push(answer);
        }
        try {
            const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
            if (thread) {
                const creator_id = thread.creator_id;
                yield user_1.default.findByIdAndUpdate(creator_id, { notify: true }, { new: true });
                const actvity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Someone added an answer", creator_id);
                if (actvity) {
                    enableNotify(req, res, thread === null || thread === void 0 ? void 0 : thread.creator_id);
                    res.status(201).json(thread);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
            }
        }
        catch (err) {
            res.status(400).json({ msg: "Thread doesn't exist " });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid input received" });
    }
});
exports.addAnswer = addAnswer;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, answer_id, content } = req.body;
    const likes = 0;
    const dislikes = 0;
    let comment_id = 0;
    const _id = thread_id;
    const thread = yield threads_1.default.findOne({ _id });
    const user_id = (0, exports.getUserID)(req);
    if (!thread) {
        res.status(400).json({ msg: "Thread doesn't exist " });
    }
    else if (content && user_id) {
        const { discussion_box } = thread;
        const { answers } = discussion_box;
        const creatorExists = yield user_1.default.findOne({ _id: user_id });
        const answer = answers.find(answer => answer.answer_id === Number(answer_id));
        if (answer && creatorExists) {
            const { comments } = answer;
            if (comments.length !== 0) {
                comment_id = comments[comments.length - 1].comment_id + 1;
            }
            const time = new Date();
            const comment = { content, likes, dislikes, comment_id, user_id, user_name: creatorExists.userName, createdAt: time };
            comments.push(comment);
            answers[answer_id].comments = comments;
            try {
                const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
                const { user_id } = answer;
                yield user_1.default.findOneAndUpdate({ _id: user_id }, { notify: true });
                const actvity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "You got a reply", answer === null || answer === void 0 ? void 0 : answer.user_id);
                if (actvity) {
                    enableNotify(req, res, thread === null || thread === void 0 ? void 0 : thread.creator_id);
                    res.status(201).json(thread);
                }
                else {
                    res.status(400).json({ msg: "Error in notifications" });
                }
            }
            catch (err) {
                res.status(400).json({ msg: "Thread doesn't exist" });
            }
        }
        else {
            res.status(400).json({ msg: "Answer not found" });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid input received" });
    }
});
exports.addComment = addComment;
const likeAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, answer_id } = req.body;
    const _id = thread_id;
    if (!thread_id) {
        res.status(400).json({ msg: "Invalid request" });
    }
    else {
        const thread = yield threads_1.default.findOne({ _id });
        if (thread) {
            const { discussion_box } = thread;
            const { answers } = discussion_box;
            const answer = answers.find(answer => answer.answer_id === Number(answer_id));
            answers[answer_id].likes++;
            try {
                const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
                if (answer) {
                    const { user_id } = answer;
                    yield user_1.default.findOneAndUpdate({ _id: user_id }, { notify: true });
                    const activity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your answer got a like", answer === null || answer === void 0 ? void 0 : answer.user_id);
                    if (activity) {
                        enableNotify(req, res, activity === null || activity === void 0 ? void 0 : activity.user_id);
                        res.status(201).json(thread);
                    }
                    else {
                        res.status(400).json({ msg: "Error in notifications" });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ msg: "Error updating thread " });
            }
        }
        else {
            res.status(400).json({ msg: "Thread doesn't exist " });
        }
    }
});
exports.likeAnswer = likeAnswer;
const dislikeAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, answer_id } = req.body;
    const _id = thread_id;
    if (!thread_id) {
        res.status(400).json({ msg: "Invalid request" });
    }
    else {
        const thread = yield threads_1.default.findOne({ _id });
        if (thread) {
            const { discussion_box } = thread;
            const { answers } = discussion_box;
            const answer = answers.find(answer => answer.answer_id === Number(answer_id));
            answers[answer_id].likes--;
            try {
                const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
                if (answer) {
                    const { user_id } = answer;
                    yield user_1.default.findOneAndUpdate({ _id: user_id }, { notify: true });
                    const activity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your answer got a dislike", answer === null || answer === void 0 ? void 0 : answer.user_id);
                    if (activity) {
                        enableNotify(req, res, activity === null || activity === void 0 ? void 0 : activity.user_id);
                        res.status(201).json(thread);
                    }
                    else {
                        res.status(400).json({ msg: "Error in notifications" });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ msg: "Error updating thread " });
            }
        }
        else {
            res.status(400).json({ msg: "Thread doesn't exist " });
        }
    }
});
exports.dislikeAnswer = dislikeAnswer;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, answer_id, comment_id } = req.body;
    const _id = thread_id;
    if (!thread_id) {
        res.status(400).json({ msg: "Invalid request" });
    }
    else {
        const thread = yield threads_1.default.findOne({ _id });
        if (thread) {
            const { discussion_box } = thread;
            const { answers } = discussion_box;
            const { comments } = answers[answer_id];
            const comment = comments.find(comment => comment.comment_id === Number(comment_id));
            comments[comment_id].likes++;
            try {
                const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
                if (comment) {
                    const { user_id } = comment;
                    yield user_1.default.findOneAndUpdate({ _id: user_id }, { notify: true });
                    const activity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your comment got a like", comment === null || comment === void 0 ? void 0 : comment.user_id);
                    if (activity) {
                        enableNotify(req, res, activity === null || activity === void 0 ? void 0 : activity.user_id);
                        res.status(201).json(thread);
                    }
                    else {
                        res.status(400).json({ msg: "Error in notifications" });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ msg: "Error updating thread " });
            }
        }
        else {
            res.status(400).json({ msg: "Thread doesn't exist " });
        }
    }
});
exports.likeComment = likeComment;
const dislikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id, answer_id, comment_id } = req.body;
    const _id = thread_id;
    if (!thread_id) {
        res.status(400).json({ msg: "Invalid request" });
    }
    else {
        const thread = yield threads_1.default.findOne({ _id });
        if (thread) {
            const { discussion_box } = thread;
            const { answers } = discussion_box;
            const { comments } = answers[answer_id];
            const comment = comments.find(comment => comment.comment_id === Number(comment_id));
            comments[comment_id].likes--;
            try {
                const thread = yield threads_1.default.findByIdAndUpdate(_id, { discussion_box: { answers } }, { new: true });
                if (comment) {
                    const { user_id } = comment;
                    yield user_1.default.findOneAndUpdate({ _id: user_id }, { notify: true });
                    const activity = yield (0, activityControllers_1.createActivity)(req, res, thread_id, answer_id, "Your comment got a dislike", comment === null || comment === void 0 ? void 0 : comment.user_id);
                    if (activity) {
                        enableNotify(req, res, activity === null || activity === void 0 ? void 0 : activity.user_id);
                        res.status(201).json(thread);
                    }
                    else {
                        res.status(400).json({ msg: "Error in notifications" });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ msg: "Error updating thread " });
            }
        }
        else {
            res.status(400).json({ msg: "Thread doesn't exist " });
        }
    }
});
exports.dislikeComment = dislikeComment;
