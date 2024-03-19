"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const threadsRoutes_1 = __importDefault(require("./routes/threadsRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://movie-hub27.netlify.app"
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/user', userRoutes_1.default);
app.use('/threads', threadsRoutes_1.default);
app.use('/activity', activityRoutes_1.default);
mongoose_1.default.connect((process.env.MONGO_URI || "")).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening to port 3000');
    });
});
