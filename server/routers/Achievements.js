const express = require("express")
const router = express.Router()
const achievementControler = require("../controlers/Achievements")
const verifyJWT = require("../middleware/verifyJWT")
const verifyJWT_Staff = require("../middleware/verifyJWT_Staff")    
const verifyJWT_Manager = require("../middleware/verifyJWT_Manager")

router.post("/", verifyJWT_Staff, achievementControler.createAchievement)
router.get("/:userId", verifyJWT,achievementControler.getAllAchievementsById)
router.put("/",verifyJWT_Staff ,achievementControler.updateAchievement)
router.delete("/:id", verifyJWT_Staff,achievementControler.deleteAchievement)

module.exports = router