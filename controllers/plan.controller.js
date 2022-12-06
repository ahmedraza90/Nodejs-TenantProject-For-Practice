const { formatResponse } = require("../helpers/utility");
const { planService } = require("../services");


async function createPlan(req, res) {
    try {
        const response = await planService.createPlan(req.body);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }
    } catch (error) {
        
        const {message, statusCode} = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500,"error", message));
    }
}
async function getPlans(req, res) {
    try {
        const response = await planService.getPlans();
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }
    } catch (error) {
        
        const {message, statusCode} = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500,"error", message));
    }
}

module.exports = {createPlan,getPlans}