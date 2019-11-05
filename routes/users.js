const express = require("express")
const router = express.Router()

const UsersController = require("../controllers/users")

router.post("/", UsersController.post)
router.put("/", UsersController.put)

module.exports = router