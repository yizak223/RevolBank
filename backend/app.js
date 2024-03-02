const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.routes")
const accountRouter = require("./routes/account.routes")
const transactionRouter = require("./routes/transaction.routes")
const loanRouter = require('./routes/loan.routes')
const crditCardRouter = require('./routes/creditCard.routes')
const expanseRouter = require('./routes/expanse.routes')
const incomeRouter = require('./routes/income.routes')


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/transactions", transactionRouter)
app.use("/api/v1/loans", loanRouter)
app.use("/api/v1/crditCard", crditCardRouter)
app.use("/api/v1/expanses", expanseRouter)
app.use("/api/v1/incomes", incomeRouter)


module.exports = { app }
