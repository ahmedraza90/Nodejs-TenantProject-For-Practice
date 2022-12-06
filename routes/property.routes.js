const { router } = require("../app")
const { fileUpload } = require("../middleware/fileupload")
const PropertyController = require("../controllers/property.controller")
const { requireSignin } = require('../middleware/authorization');

const cpUpload = fileUpload.fields([{ name: 'propertyPhoto', maxCount: 1 }, { name: 'propertyAttachments', maxCount: 8 }])
router.post("/landlord/property", requireSignin, cpUpload, PropertyController.store);
router.put("/landlord/property/:id", requireSignin, cpUpload, PropertyController.updateProperty);
router.get("/landlord/property", requireSignin, PropertyController.getPropertiesByLandlord);
router.get("/landlord/property/:id", requireSignin, PropertyController.getPropertyDetailById);
router.get("/properties", requireSignin, PropertyController.filterProperty);
router.delete("/landlord/property/:id", requireSignin, PropertyController.deletePropertyByLandlord);

module.exports = router
