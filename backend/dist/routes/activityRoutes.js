"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireAuth_1 = require("../middleware/requireAuth");
const activityControllers_1 = require("../controllers/activityControllers");
const router = express_1.default.Router();
router.get('/userActivities', requireAuth_1.requireAuth, activityControllers_1.getUserActivities);
exports.default = router;
