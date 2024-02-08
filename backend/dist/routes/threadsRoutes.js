"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireAuth_1 = require("../middleware/requireAuth");
const threadsControllers_1 = require("../controllers/threadsControllers");
const router = express_1.default.Router();
router.get('/getThreads', threadsControllers_1.getThreads);
router.get('/getUserThreads', requireAuth_1.requireAuth, threadsControllers_1.getUserThreads);
router.get('/getThread', threadsControllers_1.getThread);
exports.default = router;
