const { propertyService } = require("../services")
const { formatResponse } = require("../helpers/utility")

async function store(req, res) {
    try {
        const propertyPhoto = req.files.propertyPhoto[0].filename

        const response = await propertyService.addProperty(req.body, propertyPhoto, req.files.propertyAttachments, req.id);

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

async function getPropertiesByLandlord(req, res) {
    try {
        const response = await propertyService.getPropertiesByLandlord(req.id);
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
async function getPropertyDetailById(req, res) {
    try {
        const { id } = req.params
        const response = await propertyService.getPropertyDetailById(id);
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
async function filterProperty(req, res) {
    try {
        const { id } = req.params
        const response = await propertyService.filterProperty(req.query);
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
async function updateProperty(req, res) {
    try {
        const { id } = req.params

        const propertyPhoto = req.files.propertyPhoto ? req.files.propertyPhoto[0].filename : ""
        const propertyAttachments = req.files.propertyAttachments ? req.files.propertyAttachments : []
        // const propertyImageGallery = req.files.propertyImageGallery ? req.files.propertyImageGallery : []

        const response = await propertyService.updateProperty(req.body, id, propertyPhoto, propertyAttachments, req.id);

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

async function deletePropertyByLandlord(req, res) {
    try {
        const { id } = req.params
        const response = await propertyService.deletePropertyByLandlord(id, req.id);
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
    store,
    getPropertiesByLandlord,
    updateProperty,
    deletePropertyByLandlord,
    getPropertyDetailById,
    filterProperty
}
