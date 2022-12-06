const validate = require("../helpers/validationSchema")
const {createResponse, formatResponse} = require("../helpers/utility")
const Issue = require("../model/issue")
const { BaseError } = require("../helpers/ErrorHandling")

async function insertIssues(data,createdBy) {
        const {title} = data;
        const response = await validate.issueSchema.validate({
            title
        });
        if (typeof response.error !== "undefined") {
            return createResponse(response);
        }
        await Issue.create({title,createdBy});
        return formatResponse(201,"success", "Inserted successfully")

}

async function getIssues() {
        const data = await Issue.find({});
        return formatResponse(200,"success", "", {data})

}

module.exports = {
    insertIssues,
    getIssues
}



