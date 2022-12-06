const validate = require('../helpers/validationSchema')
const { createResponse, formatResponse } = require('../helpers/utility')
const Accounting = require('../model/accounting')
const { BaseError } = require("../helpers/ErrorHandling")



async function addTransaction(data, file, createdBy) {
    let files = [];
    if (file.length > 0) {
        files = file.map(file => {
            return  file.filename 
        });
    }
    const transaction = {
        ...data,
        createdBy,
        files
    }
    const response = await validate.accountingSchema.validate(transaction)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    await Accounting.create(transaction)
    return formatResponse(201,'success', 'Inserted successfully')
}

async function getTransaction(createdBy) {
    const transactions = await Accounting.find({
        $and: [
            { accountingType: "normal" },
            { createdBy: createdBy }
        ]
    },'payer type dueOn amount createdBy').populate({ path: "payer", select: "_id firstName lastName" })
    .exec();
    console.log(transactions)
    if (transactions.length==0) {
        throw new BaseError(`transaction do not exist with this user`, 404)
    }
    return formatResponse(200,"Success", "", {transactions})
}
async function getTransactionDetailById(_id) {
    const transaction = await Accounting.findById(_id)
    if (transaction == null) {
        throw new BaseError(`transactiosssn does not exist `, 404)
    }
    return formatResponse(200,"Success", "", {transaction})
}
async function getRecurringTransaction(createdBy) {
    const transactions = await Accounting.find({
        $and: [
            { accountingType: "recurring" },
            { createdBy: createdBy }
        ]
    })
    .populate({ path: "payer", select: "_id firstName lastName" })
    .exec();
    if (transactions.length==0) {
        throw new BaseError(`transaction do not exist with this user`, 404)
    }
    return formatResponse(200,"Success", "", {transactions})
}

async function updateTransaction(body, _id, file,createdBy) {
    let files = [];
    if (file.length > 0) {
        files = file.map(file => {
            return  file.filename 
        });
    }
    const remainingFiles = JSON.parse(data.remainingFiles)
    const data = {
        ...body,
        files : [...files,...remainingFiles ],
        createdBy
    }
    const response = await validate.accountingSchema.validate(data)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    const transaction = await Accounting.findOneAndUpdate({ _id },
        data,
        { new: true }
    )
    if (transaction == null) {
        throw new BaseError(`transaction does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}
async function deleteTransaction(_id, createdBy) {
    const transaction = await Accounting.findOneAndDelete({ $and: [
        { _id: _id },
        { createdBy: createdBy }
    ] }
    )
    if (transaction == null) {
        throw new BaseError(`transaction does not exist `, 404)
    }
    return formatResponse(202, "Success", "Deleted successfully")
}
async function PayerTransaction(id) {
    const transaction = await Accounting.find({id},'payer type dueOn amount createdBy')  
    .populate({ path: "createdBy", select: "_id firstName lastName" })
    .exec();
    if (transaction.length==0) {
        throw new BaseError(`transaction do not exist with this user`, 404)
    }
    return formatResponse(200,"Success", "", {transaction})
}

module.exports = {
    addTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getRecurringTransaction,
    getTransactionDetailById,
    PayerTransaction
}