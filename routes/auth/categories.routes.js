const {router} = require("../../app")
const { requireSignin } = require('../../middleware/authorization');
const Category = require("../../model/categories")
const CategoryController = require("../../controllers/category.controller")
const data =require("../../categories.json")


router.post("/categories",requireSignin, CategoryController.insertCategories);
router.get("/categories",requireSignin, CategoryController.findRequested);

module.exports = router
