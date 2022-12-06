const {router} = require("../app")
const planController = require("../controllers/plan.controller");
const { requireSignin } = require('../middleware/authorization');

router.post("/plan", planController.createPlan);
router.get("/plan", planController.getPlans);


module.exports = router