const express=require("express")
const router=express.Router()
const planscontroller=require("../controllers/Planscontroller")
const verifyJWT_Manager=require('../middleware/verifyJWT_Manager')
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWT_Staff=require('../middleware/verifyJWT_Staff')

router.get('/',verifyJWT,planscontroller.getallplans)
router.get('/:id',verifyJWT,planscontroller.getplansbyid)
router.post('/',verifyJWT_Staff,planscontroller.createplan)
router.put('/',verifyJWT,planscontroller.updateplan)
router.put('/number_of_particpants',verifyJWT_Staff,planscontroller.updatenumber_of_particpants)
router.delete('/',verifyJWT_Manager,planscontroller.deleteplan)

module.exports=router