const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.routes")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/users",userRouter)

module.exports = { app }