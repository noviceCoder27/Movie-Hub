"use strict";
exports.__esModule = true;
var express_1 = require("express");
var requireAuth_1 = require("../middleware/requireAuth");
var activityControllers_1 = require("../controllers/activityControllers");
var router = express_1["default"].Router();
router.get('/userActivities', requireAuth_1.requireAuth, activityControllers_1.getUserActivities);
exports["default"] = router;
