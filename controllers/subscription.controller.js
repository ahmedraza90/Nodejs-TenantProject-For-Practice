const {subscriptionService} = require("../services")
const {formatResponse} = require("../helpers/utility")

async function addCustomer(req, res) {
    try{
        const response = await subscriptionService.addCustomer(req.body);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}


async function setupIntent(req, res) {
    try{
        const response = await subscriptionService.setupIntent(req.user);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}

async function addSubscription(req, res) {
    try{
        const response = await subscriptionService.addSubscription(req.body,req.id,req.user);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}

async function retrieveCustomer(req, res) {
    try {
        const { id } = req.params
        const response = await subscriptionService.retrieveCustomer(id);
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
async function  getListOfSubscription(req, res) {
    try {
        const response = await subscriptionService.getListOfSubscription();
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


async function removeSubscription(req, res) {
    try{
        const { id } = req.params
        const response = await subscriptionService.removeSubscription(id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const {message, statusCode} = error;
        res.status(statusCode || 400).json(formatResponse(statusCode || 500,"error", message));    }
}
async function webhook(req, res) {
    try{
        const payload = req.body
        const sig     = req.headers['stripe-signature'] 
        const response = await subscriptionService.webhook(payload,sig);
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
    addCustomer,
    retrieveCustomer,
    removeSubscription,
    addSubscription,
    getListOfSubscription,
    setupIntent,
    webhook
}