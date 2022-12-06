const {reminderService} = require("../services")
const {formatResponse} = require("../helpers/utility")

async function insertReminder(req, res) {
    try{
        const response = await reminderService.insertReminder(req.body,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}
async function getReminders(req, res) {
    try {
        const response = await reminderService.getReminders(req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500, "error", message));
    }
}
async function getReminderDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await reminderService.getReminderDetailById(req.id,id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500, "error", message));
    }
}



async function updateReminder(req, res) {
    try{
        const { id } = req.params
        const response = await reminderService.updateReminder(req.body,id,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}
async function deleteReminder(req, res) {
    try{
        const { id } = req.params
        const response = await reminderService.deleteReminder(id,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}

module.exports = {
    insertReminder,
    getReminders,
    deleteReminder,
    updateReminder,
    getReminderDetailById
}