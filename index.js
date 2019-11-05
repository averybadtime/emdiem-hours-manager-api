const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

const BodyParser = require("body-parser")
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

const CORS = require("cors")
app.use(CORS())

const UsersRoutes = require("./routes/users")

app.use("/api/users", UsersRoutes)


app.listen(PORT, () => console.log("server running successfully!"))