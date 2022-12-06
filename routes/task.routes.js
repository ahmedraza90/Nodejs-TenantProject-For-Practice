const { router } = require("../app")
const { requireSignin } = require('../middleware/authorization');
const taskController = require("../controllers/task.controller")


router.post("/todo", requireSignin, taskController.insertTask);
router.get("/todo", requireSignin, taskController.getTasks);
router.put("/todo/:id",requireSignin, taskController.updateTasks);
router.delete("/todo/:id",requireSignin, taskController.deleteTask);


module.exports = router