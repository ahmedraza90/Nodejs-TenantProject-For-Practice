const {router} = require("../../app")
const RequestController = require("../../controllers/request.controller")
const {fileUpload}=require("../../middleware/fileupload")
const { requireSignin } = require('../../middleware/authorization');
const cpUpload = fileUpload.fields([{name: 'requestPhoto', maxCount: 8}])

router.post("/landlord/maintenance-request",requireSignin,cpUpload, RequestController.insertRequest);
router.put("/landlord/maintenance-request/:id",requireSignin,cpUpload, RequestController.updateRequestByLandlord);
router.get("/landlord/maintenance-request",requireSignin, RequestController.getRequests);
router.get("/landlord/maintenance-request/:id",requireSignin, RequestController.getMaintenanceDetail);
router.delete("/landlord/maintenance-request/:id",requireSignin, RequestController.deleteRequestByLandlord);
module.exports = router
