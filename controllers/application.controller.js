const { applicationService } = require("../services")
const { formatResponse } = require("../helpers/utility")

async function insertApplicationDetail(req, res) {
    try {
        const applicantPhoto = req.files.applicantPhoto[0].filename
        const response = await applicationService.insertApplication(req.body, applicantPhoto, req.id);
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

async function getApplication(req, res) {
    try {
        const response = await applicationService.getApplication(req.id);
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
async function getApplicationDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await applicationService.getApplicationDetailById(id);
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

async function updateApplication(req, res) {
    try{
        const { id } = req.params
        const applicantPhoto = req.files.applicantPhoto ? req.files.applicantPhoto[0].filename : ""
        const response = await applicationService.updateApplication(req.body,id,applicantPhoto,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400,"error", message));    }
}
async function deleteApplication(req, res) {
    try{
        const { id } = req.params
        const response = await applicationService.deleteApplication(id,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 400,"error", message));    }
}
module.exports = {
    insertApplicationDetail,
    getApplication,
    updateApplication,
    deleteApplication,
    getApplicationDetailById
}