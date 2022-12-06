const { accountingService } = require("../services")
const { formatResponse } = require("../helpers/utility")

async function addTransaction(req, res) {
    try {
        const response = await accountingService.addTransaction(req.body, req.files.accountingFiles, req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}

async function getTransaction(req, res) {
    try {
        const response = await accountingService.getTransaction(req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}
async function getTransactionDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await accountingService.getTransactionDetailById(id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}

async function getRecurringTransaction(req, res) {
    try {
        const response = await accountingService.getRecurringTransaction(req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}

async function updateTransaction(req, res) {
    try {
        const { id } = req.params
        const accountingFiles = req.files.accountingFiles ? req.files.accountingFiles : []
        const response = await accountingService.updateTransaction(req.body, id, accountingFiles, req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}
async function deleteTransaction(req, res) {
    try {
        const { id } = req.params
        const response = await accountingService.deleteTransaction(id, req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}
async function getPayerTransaction(req, res) {
    try {
        const response = await accountingService.PayerTransaction(req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400, "error", message));
    }
}
module.exports = {
    addTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getRecurringTransaction,
    getTransactionDetailById,
    getPayerTransaction
}