const { router } = require("../app")
const { fileUpload } = require("../middleware/fileupload")
const ContactController = require("../controllers/contact.controller")
const { requireSignin } = require('../middleware/authorization');

const cpUpload = fileUpload.fields([{ name: 'contactPhoto', maxCount: 1 }, { name: 'contactDocuments', maxCount: 8 }])
router.post("/contact", requireSignin, cpUpload, ContactController.addContact);
router.put("/contact/:id", requireSignin, cpUpload, ContactController.updateContact);

//documents in the response of these apis contains all fields, but here specific field are required [name,phone,no-of-properties]
router.get("/landlord/tenants", requireSignin, ContactController.getTenantsByLandlord);
router.get("/landlord/professionals", requireSignin, ContactController.getProfessionalsByLandlord);
router.get("/professional/contact", requireSignin, ContactController.getContactsByServicePro);

//flow of these apis is same, we can make it one, all these apis are getting "Contact detail" on the basis of docment-id 
router.get("/landlord/professionals/:id", requireSignin, ContactController.getProfessionalDetailById);
router.get("/landlord/tenants/:id", requireSignin, ContactController.getTenantDetailById);
router.get("/professional/contact/:id", requireSignin, ContactController.getContactDetailById);//??????

module.exports = router