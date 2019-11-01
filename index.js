const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (_, res) => {
  return res.send({
    code: 23
  })
})

app.listen(PORT, () => console.log("server running successfully!"))