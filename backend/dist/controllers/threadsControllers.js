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
exports.getThread = exports.getUserThreads = exports.getThreads = void 0;
const threads_1 = __importDefault(require("./../models/threads"));
const user_1 = __importDefault(require("./../models/user"));
const userControllers_1 = require("./userControllers");
const getThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movie_id } = req.headers;
    if (movie_id) {
        try {
            const threads = yield threads_1.default.find({ movie_id });
            res.status(201).json(threads);
        }
        catch (err) {
            res.status(400).json({ msg: "Error getting threads" });
        }
    }
    else {
        res.status(400).json({ msg: "Enter valid movie" });
    }
});
exports.getThreads = getThreads;
const getUserThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = (0, userControllers_1.getUserID)(req);
    if (_id) {
        try {
            const user = yield user_1.default.findOne({ _id });
            if (user) {
                const { threads: threadIDs } = user;
                if (threadIDs) {
                    const threads = [];
                    for (const threadID of threadIDs) {
                        const thread = yield threads_1.default.findOne({ _id: threadID });
                        threads.push(thread);
                    }
                    res.status(201).json(threads);
                }
                else {
                    res.status(201).json({ msg: [] });
                }
            }
            else {
                res.status(400).json({ msg: "No user" });
            }
        }
        catch (err) {
            res.status(400).json({ msg: "Error getting threads" });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid User" });
    }
});
exports.getUserThreads = getUserThreads;
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thread_id } = req.headers;
    if (thread_id) {
        const _id = thread_id;
        try {
            const thread = yield threads_1.default.findOne({ _id });
            res.status(201).json(thread);
        }
        catch (err) {
            res.status(400).json({ msg: "Error getting thread" });
        }
    }
    else {
        res.status(400).json({ msg: "Inavlid thread" });
    }
});
exports.getThread = getThread;
