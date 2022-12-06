const {router} = require("../../app")
const IssueController = require("../../controllers/issue.controller")
const { requireSignin } = require('../../middleware/authorization');

router.post("/issues",requireSignin, IssueController.insertIssues);
router.get("/issues",requireSignin, IssueController.getIssues);

module.exports = router
