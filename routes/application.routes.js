const {router} = require("../app");
const ApplicationController = require("../controllers/application.controller")
const {fileUpload}=require("../middleware/fileupload")
const { requireSignin } = require('../middleware/authorization');

const cpUpload = fileUpload.fields([{name: 'applicantPhoto', maxCount: 1}])
router.post("/landlord/applications",requireSignin,cpUpload, ApplicationController.insertApplicationDetail);
router.get("/landlord/applications",requireSignin, ApplicationController.getApplication);
router.put("/landlord/applications/:id",requireSignin,cpUpload, ApplicationController.updateApplication);
router.delete("/landlord/applications/:id",requireSignin, ApplicationController.deleteApplication);
router.get("/landlord/applications/:id",requireSignin, ApplicationController.getApplicationDetailById);

//tenant
router.post("/tenant/applications",requireSignin,cpUpload, ApplicationController.insertApplicationDetail);
router.get("/tenant/applications",requireSignin, ApplicationController.getApplication);//list of applications by signed user's id
router.put("/tenant/applications/:id",requireSignin,cpUpload, ApplicationController.updateApplication);//update application by application-id
router.delete("/tenant/applications/:id",requireSignin, ApplicationController.deleteApplication);//delete user by application-id
router.get("/tenant/applications/:id",requireSignin, ApplicationController.getApplicationDetailById);//get application by application-id 


module.exports = router