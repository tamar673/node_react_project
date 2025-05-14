const express=require('express')
const router=express.Router()
const galleryController=require('../controlers/Gallery')
const verifyJWT = require("../middleware/verifyJWT")
const verifyJWT_Staff = require("../middleware/verifyJWT_Staff")    
const verifyJWT_Manager = require("../middleware/verifyJWT_Manager")

router.get('/',verifyJWT,galleryController.getAllGallery)
router.get('/:type',galleryController.getSpcGallery)
router.post('/', galleryController.upload.single('image'), galleryController.createNew);
router.put('/status/',galleryController.changeStatus)
router.put('/public/',galleryController.changePublic)
router.delete('/',galleryController.deleteFromGallry)

module.exports=router

