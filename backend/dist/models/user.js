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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notify: { type: Boolean, required: true },
    profilePicture: { type: String },
    threads: { type: (Array) },
    activities: { type: (Array) }
}, { timestamps: true });
UserSchema.statics.register = function (userName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userName || !email || !password) {
            return null;
        }
        if (!validator_1.default.isEmail(email)) {
            return null;
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            return null;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = { userName, email, password: hash };
        return user;
    });
};
UserSchema.statics.login = function (userName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userName || !email || !password) {
            return null;
        }
        if (!validator_1.default.isEmail(email)) {
            return null;
        }
        const user = yield this.findOne({ email });
        const verified = yield bcrypt_1.default.compare(password, user.password);
        if (verified) {
            return user;
        }
        else {
            return null;
        }
    });
};
exports.default = mongoose_1.default.model("User", UserSchema);
