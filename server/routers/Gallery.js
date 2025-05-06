const express=require('express')
const router=express.Router()
const galleryController=require('../controlers/Gallery')

router.get('/',galleryController.getAllGallery)
router.get('/:type',galleryController.getSpcGallery)
router.post('/', galleryController.upload.single('image'), galleryController.createNew);
router.put('/status/',galleryController.changeStatus)
router.put('/public/',galleryController.changePublic)
router.delete('/',galleryController.deleteFromGallry)

module.exports=router

