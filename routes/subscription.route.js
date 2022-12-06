const { router } = require("../app")
const { requireSignin } = require('../middleware/authorization');
const subscriptionController = require("../controllers/subscription.controller")






router.get("/setupIntent",requireSignin,subscriptionController.setupIntent);

router.get("/getSubscription", subscriptionController.getListOfSubscription);
router.post("/payment",  subscriptionController.addCustomer);
router.post("/addSubscription/:id",  subscriptionController.addSubscription); //here id params is price-id
router.get("/retieveCustomer/:id", subscriptionController.retrieveCustomer);
router.delete("/cancelSubscription/:id", requireSignin, subscriptionController.retrieveCustomer);
router.post("/webhook", subscriptionController.webhook)
router.get('/subscriptionPage', function(req, res){
	res.render('subscriptionPage')
})




module.exports = router