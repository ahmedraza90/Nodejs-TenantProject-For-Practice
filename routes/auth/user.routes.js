const {router} = require("../../app")
const { requireSignin } = require('../../middleware/authorization');
const Category = require("../../model/categories")
const userController = require("../../controllers/user.controller")
const data =require("../../categories.json")
const {fileUpload}=require("../../middleware/fileupload")


router.get("/user",requireSignin, userController.userDetail);
router.patch("/user",requireSignin,fileUpload.single('avatar'), userController.userUpdate);
router.delete("/user",requireSignin,userController.userDelete);

module.exports = router
