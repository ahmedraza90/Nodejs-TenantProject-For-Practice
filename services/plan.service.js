const Plan = require("../model/plan");
const validate = require("../helpers/validationSchema");
const { createResponse, formatResponse } = require("../helpers/utility");
const { BaseError } = require("../helpers/ErrorHandling");


async function createPlan(data) {
    const { name, price, stripe_planId } = data;
    const response = validate.planSchema.validate({
        name, price, stripe_planId
    });

    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }

    const oldPlan = await Plan.findOne({ stripe_planId });

    if (oldPlan) {
        throw new BaseError("Plan already exist", 400);
    }
    await Plan.create({
        name, price, stripe_planId
    });

    return formatResponse(201, "Success", "Plan Created Successfully")
}

async function getPlans() {
    const plans = await Plan.find().exec();

    return formatResponse(200, "Success", "", { plans })
}

module.exports = { createPlan,getPlans }