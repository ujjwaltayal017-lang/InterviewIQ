
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

const app = express();

app.use(cors({
    origin: "https://interviewiq-frontend-9omn.onrender.com",
    credentials: true
}))


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// ================= GLOBAL ERROR HANDLER =================
// Express 5 auto-forwards thrown/rejected errors from async route handlers
// to this middleware. Without it, errors fall through to Express's default
// HTML error page, which the frontend can't parse as JSON.
app.use((err, req, res, next) => {
    console.error("UNHANDLED ERROR:", err);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong. Please try again."
    });
});
// ==========================================================

module.exports = app;
