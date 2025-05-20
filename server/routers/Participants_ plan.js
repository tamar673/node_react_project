const express=require("express")
const router=express.Router()
const ppcontroller=require("../controllers/Participants_plan")
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWT_Staff=require('../middleware/verifyJWT_Staff')

router.get("/:userId",verifyJWT,ppcontroller.getallbyidstudent)
router.get("/getbyplan/:planId",verifyJWT_Staff,ppcontroller.getallbyidplan)
router.post("/",verifyJWT,ppcontroller.createparticipant)
router.put("/up/",verifyJWT_Staff,ppcontroller.updateUpScore)
router.put("/down/",verifyJWT_Staff,ppcontroller.updateDownScore)
router.delete("/:_id",verifyJWT_Staff,ppcontroller.deleteparticipant)

module.exports=router
 