const { router } = require("../app")
const { fileUpload } = require("../middleware/fileupload")
const AccountingController = require("../controllers/accounting.controller")
const { requireSignin } = require('../middleware/authorization');

const cpUpload = fileUpload.fields([{ name: 'accountingFiles', maxCount: 8 }])
router.post("/landlord/transaction", requireSignin, cpUpload, AccountingController.addTransaction);
router.get("/landlord/transaction", requireSignin, AccountingController.getTransaction);
router.get("/landlord/transaction/:id", requireSignin, AccountingController.getTransactionDetailById);
router.put("/landlord/transaction/:id", requireSignin, cpUpload, AccountingController.updateTransaction);
router.delete("/landlord/transaction/:id", requireSignin, AccountingController.deleteTransaction);
router.get("/landlord/transactions/recurrings", requireSignin, AccountingController.getRecurringTransaction);
router.get("/transactions", requireSignin, AccountingController.getPayerTransaction);//list of transactions thourgh payer id

module.exports = router