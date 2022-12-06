const {router} = require("../app")
const listingController = require("../controllers/listing.controller");
const { requireSignin } = require('../middleware/authorization');

router.post("/landlord/listing",requireSignin, listingController.addListing);
router.get("/landlord/listing",requireSignin, listingController.getListingByLandlord);
router.put("/landlord/listing/:id",requireSignin, listingController.updateListing);

module.exports = router