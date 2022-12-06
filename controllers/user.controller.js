const { userDetails } = require("../services")
const { formatResponse } = require("../helpers/utility")


async function userDetail(req, res) {
    try {
        const response = await userDetails.userDetail(req.id);
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

async function userUpdate(req, res) {
    try {
        if(req.file){
            req.body.avatar = req.file.filename
        }
        
        const response = await userDetails.userUpdate(req.id,req.body);
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

async function userDelete(req, res) {
    try {
        const response = await userDetails.userDelete(req.id);
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
    userDetail,
    userUpdate,
    userDelete
}
