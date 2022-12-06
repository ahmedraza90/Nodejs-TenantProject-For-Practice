const {router} = require("../../app")
const authController = require("../../controllers/auth.controller")
const { requireSignin } = require('../../middleware/authorization');

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.patch("/change-password",requireSignin, authController.changePassword);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-user", authController.verifyResetUser);
router.patch("/reset-password", authController.resetPassword);
router.patch("/user-role",requireSignin, authController.userRole);
router.patch("/user-plan",requireSignin, authController.userPlan);
router.get("/AuthPage",function(req,res){res.render('Auth')});
router.get('/auth/google', authController.googleSignin);
router.get('/auth/facebook', authController.facebookSignin); 
module.exports = router
