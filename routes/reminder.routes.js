const { router } = require("../app")
const { requireSignin } = require('../middleware/authorization');
const reminderController = require("../controllers/reminder.controller")


router.post("/landlord/reminder", requireSignin, reminderController.insertReminder);
router.get("/landlord/reminder", requireSignin, reminderController.getReminders);
router.get("/landlord/reminder/:id", requireSignin, reminderController.getReminderDetailById);
router.put("/landlord/reminder/:id",requireSignin, reminderController.updateReminder);
router.delete("/landlord/reminder/:id",requireSignin, reminderController.deleteReminder);


module.exports = router