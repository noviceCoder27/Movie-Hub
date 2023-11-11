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
exports.addThread = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("./../models/user"));
const threads_1 = __importDefault(require("./../models/threads"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = yield user_1.default.register(userName, email, password);
    if (user) {
        try {
            const createdUser = yield user_1.default.create(user);
            res.status(201).json(createdUser);
        }
        catch (err) {
            res.status(500).json({ msg: "Failed to register" });
        }
    }
    else {
        res.status(500).json({ msg: "Failed to register" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    const user = yield user_1.default.login(userName, email, password);
    if (user) {
        try {
            const _id = user._id;
            yield user_1.default.findOne({ _id });
            res.status(201).json(user);
        }
        catch (err) {
            res.status(500).json({ msg: "Failed to login" });
        }
    }
    else {
        res.status(500).json({ msg: "Failed to login" });
    }
});
exports.login = login;
const addThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, creator_id } = req.body;
    if (title && description && creator_id) {
        try {
            const thread = yield threads_1.default.create({ title, description, creator_id });
            res.status(201).json(thread);
        }
        catch (err) {
            res.status(500).json({ msg: "Failed to create thread" });
        }
    }
    else {
        res.status(500).json({ msg: "Invalid input received" });
    }
});
exports.addThread = addThread;
