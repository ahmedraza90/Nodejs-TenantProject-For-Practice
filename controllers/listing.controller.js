const { listingService } = require("../services")
const { formatResponse } = require("../helpers/utility")

async function addListing(req, res) {
    try {

        const response = await listingService.addListing(req.body, req.id);

        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}
async function getListingByLandlord(req, res) {
    try {

        const response = await listingService.getListingByLandlord(req.id);

        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}

async function updateListing(req, res) {
    try {
        const { id } = req.params;
        const response = await listingService.updateListing(req.body, id,req.id);

        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}

module.exports = {
    addListing,
    getListingByLandlord,
    updateListing
}