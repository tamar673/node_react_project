const express = require("express")
const router = express.Router()
const userControler = require("../controllers/usersControllers")
const verifyJWT_Manager=require('../middleware/verifyJWT_Manager')
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWT_Staff=require('../middleware/verifyJWT_Staff')

router.post("/", verifyJWT_Manager,userControler.creatUser)
router.get("/:status",verifyJWT_Staff,userControler.getByType)
router.get("/getbyid/:_id",verifyJWT_Staff ,userControler.getUserById)
router.put("/", verifyJWT_Manager,userControler.updateUser)
router.delete("/:_id",verifyJWT_Manager ,userControler.deleteUser)

module.exports = router




