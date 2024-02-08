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
exports.requireAuth = void 0;
const user_1 = __importDefault(require("./../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token && token !== "null") {
            const secret = process.env.SECRET;
            const idObj = jsonwebtoken_1.default.verify(token, secret);
            if (typeof idObj !== "string") {
                const { _id } = idObj;
                const user = yield user_1.default.findOne({ _id });
                if (user) {
                    req.headers["user"] = JSON.stringify(user);
                    next();
                }
                else {
                    res.status(400).json({ msg: "User not found" });
                }
            }
            else {
                res.status(400).json({ msg: "Invalid authorization token" });
            }
        }
        else {
            res.status(400).json({ msg: "Invalid authorization token" });
        }
    }
    else {
        res.status(400).json({ msg: "Invalid authorization token" });
    }
});
exports.requireAuth = requireAuth;
