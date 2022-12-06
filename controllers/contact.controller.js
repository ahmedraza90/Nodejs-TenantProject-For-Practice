const { contactService } = require("../services")
const { createResponse, formatResponse } = require("../helpers/utility")

async function addContact(req, res) {
    try {
        const photo = req.files.contactPhoto[0].filename

        const response = await contactService.addContact(req.body, photo, req.files.contactDocuments, req.id);

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
async function getTenantsByLandlord(req, res) {
    try {

        const response = await contactService.getTenantsByLandlord(req.id);

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
async function getTenantDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await contactService.getTenantDetailById(id);
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
async function getContactsByServicePro(req, res) {
    try {

        const response = await contactService.getContactsByServicePro(req.id);

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
async function getProfessionalsByLandlord(req, res) {
    try {


        const response = await contactService.getProfessionalsByLandlord(req.id);

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
async function getProfessionalDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await contactService.getProfessionalDetailById(id);
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
async function getContactDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await contactService.getContactDetailById(id);
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
async function updateContact(req, res) {
    try {
        const { id } = req.params
        const photo = req.files.contactPhoto ? req.files.contactPhoto[0].filename : ""
        const contactDocuments = req.files.contactDocuments ? req.files.contactDocuments : []
        const response = await contactService.updateContact(req.body, id, photo, contactDocuments,req.id);

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
    addContact,
    getTenantsByLandlord,
    getProfessionalsByLandlord,
    updateContact,
    getContactsByServicePro,
    getProfessionalDetailById,
    getTenantDetailById,
    getContactDetailById
}
