const Plans=require("../models/Plans")

const getAllPlans=('/',async(req,res)=>{
    const plans=await Plans.find().lean()
    res.json(plans)
})