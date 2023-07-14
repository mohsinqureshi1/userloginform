const express = require("express");
const router = express.Router();
const auth=require("../middelware/auth")


const {form_create,create_product,get_product,get_userdetails,sign_in,user_data,forget_password,reset_password,signout} = require("../Controller/contoller")

router.post("/formcreate",form_create)
router.post("/login",sign_in)
// router.post("/productcreate",create_product)
router.get("/getdetails",get_userdetails)



router.post("/forget",forget_password)
// router.get("/userdata",auth,user_data)

// router.put("/reset-password",auth,reset_password)
// router.post("/signout_account",signout)

module.exports=router