const {register, login, verifyEmail,changePassword,forgotPassword,resetPassword,userRole,userPlan,verifyResetUser,googleSignin,facebookSignin} = require("./auth.service")
const {wellComeEmail} = require("./mail.service.js")
const {insertCategories, findRequested} = require("./category.service")
const {insertRequest,getRequests,getMaintenanceDetail,updateRequestByLandlord,deleteRequestByLandlord} = require("./request.service")
const {insertIssues, getIssues} = require("./issue.service")
const {addProperty,getPropertiesByLandlord,updateProperty,deletePropertyByLandlord,getPropertyDetailById,filterProperty} = require("./property.service")
const {createPlan,getPlans} = require("./plan.service")
const {userDetail,userUpdate,userDelete} = require("./user.service")
const {addContact,getTenantsByLandlord,getProfessionalsByLandlord,updateContact,getContactsByServicePro,getProfessionalDetailById,getContactDetailById,getTenantDetailById} = require("./contact.service")
const {addListing,getListingByLandlord,updateListing} = require("./listing.service")
const {addLease,getLeaseByLandlord, getLease} = require("./lease.service")
const {insertApplication, getApplication,getApplicationDetailById,updateApplication,deleteApplication} = require("./application.service")
const {insertReminder,getReminders,updateReminder,deleteReminder,getReminderDetailById} = require("./reminder.service.js")
const {insertTask,getTasks,updateTask,deleteTask} = require("./task.service.js")
const {addTransaction,getTransaction,updateTransaction,deleteTransaction,getRecurringTransaction,getTransactionDetailById,PayerTransaction} = require("./accounting.service.js")
const { addSubscription,retrieveCustomer,removeSubscription, addCustomer,getListOfSubscription,setupIntent,webhook} = require('./subscription.service')

const mailService = {
    wellComeEmail
}

const userDetails = {
    userDetail,
    userUpdate,
    userDelete
}

const categoryService = {
    insertCategories,
    findRequested
}
const requestService = {
    insertRequest,
    getRequests,
    getMaintenanceDetail,
    updateRequestByLandlord,
    deleteRequestByLandlord
}
const issueService = {
    insertIssues,
    getIssues
}
const authService = {
    register,
    login,
    verifyEmail,
    changePassword,
    forgotPassword,
    resetPassword,
    userRole,
    userPlan,
    verifyResetUser,
    googleSignin,
    facebookSignin
}
const propertyService = {
    addProperty,
    getPropertiesByLandlord,
    updateProperty,
    deletePropertyByLandlord,
    getPropertyDetailById,
    filterProperty
}
const planService = {
    createPlan,
    getPlans
}
const contactService = {
    addContact,
    getTenantsByLandlord,
    getProfessionalsByLandlord,
    updateContact,
    getContactsByServicePro,
    getProfessionalDetailById,
    getContactDetailById,
    getTenantDetailById
}
const listingService = {
    addListing,
    getListingByLandlord,
    updateListing
}
const leaseService = {
    addLease,
    getLeaseByLandlord,
    getLease
}

const applicationService = {
    insertApplication,
    getApplication,
    updateApplication,
    deleteApplication,
   
    getApplicationDetailById
}
const reminderService = {
    insertReminder,
    getReminders,
    updateReminder,
    deleteReminder,
    getReminderDetailById
}
const taskService = {
    insertTask,
    getTasks,
    updateTask,
    deleteTask
}
const accountingService = {
    addTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getRecurringTransaction,
    getTransactionDetailById,
    PayerTransaction
}
const subscriptionService = {
    addSubscription,
    retrieveCustomer,
    removeSubscription,
    addCustomer,
    getListOfSubscription,
    setupIntent,
    webhook
}
module.exports = {
    authService,
    mailService,
    categoryService,
    requestService,
    issueService,
    propertyService,
    planService,
    contactService,
    listingService,
    leaseService,
    applicationService,
    reminderService,
    taskService,
    accountingService,
    userDetails,
    subscriptionService
}
