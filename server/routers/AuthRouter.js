const express = require("express")
const router = express.Router()
const authController = require('../controllers/authControllers')

const verifyJWT_Manager=require('../middleware/verifyJWT_Manager')

router.post("/login", authController.login)
router.post("/register",verifyJWT_Manager,authController.register)

module.exports = router