require("dotenv").config()
const app = require("./src/app");
const connectDB = require("./src/db/db.js");
// const invokeGeminiAi = require("./src/services/ai.service.js")
// const {resume, selfDescription, jobDescription} = require("./src/services/temp.js")
// const generateInterviewReport = require("./src/services/ai.service.js")


connectDB();
// invokeGeminiAi();
// generateInterviewReport({resume, selfDescription, jobDescription})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})


