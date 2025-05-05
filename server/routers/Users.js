const express = require("express")
const router = express.Router()
const userControler = require("../controlers/Users")

router.post("/", userControler.creatUser)
router.get("/students", userControler.getAllStudents)
router.get("/staff", userControler.getAllStaff)
router.get("/:id", userControler.getUserById)
router.put("/", userControler.updateUser)
//router.put("/achievements", userControler.createAchievements)
router.delete("/:id", userControler.deleteUser)

module.exports = router