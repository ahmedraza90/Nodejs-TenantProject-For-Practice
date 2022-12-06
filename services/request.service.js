const validate = require("../helpers/validationSchema")
const { createResponse, formatResponse } = require("../helpers/utility")
const Category = require("../model/categories")
const categoriesData = require("../categories.json")
const Request = require("../model/request")
const requestData = require("../request.json")
const { BaseError } = require("../helpers/ErrorHandling")



async function insertRequest(data, issuePhotoo, createdBy) {
    
    let issuePhoto = [];
    if (issuePhotoo.length > 0) {
        issuePhoto = issuePhotoo.map(file => {
            return  file.filename 
        });
    }
    const request = {
        ...data,
        availableDates : JSON.parse(data.availableDates),
        pets : JSON.parse(data.pets),
        materials : JSON.parse(data.materials),
        createdBy,
        issuePhoto
    }
    const response = await validate.requestSchema.validate(request);

    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    await Request.create(request);
    return formatResponse(201, "success", "Inserted successfully")
}

async function updateRequestByLandlord(data, _id, issuePhoto, createdBy) {
    const request = {
        ...data,
        availableDates : JSON.parse(data.availableDates),
        pets : JSON.parse(data.pets),
        materials : JSON.parse(data.materials),
        createdBy
    }
    const response = await validate.requestSchema.validate(request);
    if (issuePhoto != "") {
        request.issuePhoto = issuePhoto
    }
    const result = await Request.findOneAndUpdate({ _id },
        request,
        { new: true }
    )
    if (request == null) {
        throw new BaseError(`request does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}
async function deleteRequestByLandlord(_id, createdBy) {
    const request = await Request.findOneAndDelete({ $and: [
        { _id: _id },
        { createdBy: createdBy }
    ] }
    )
    if (request == null) {
        throw new BaseError(`request does not exist `, 404)
    }
    console.log(request)
    return formatResponse(202, "Success", "Deleted successfully")
}

async function getRequests(createdBy) {

    const requests = await Request.find({ createdBy })
    .populate({ path: "property", select: "_id name" })
    .exec();
    if (requests.length==0) {
        throw new BaseError(`requests do not exist with this user`, 404)
    }
    return formatResponse(200, "Success", "", { requests })
}
async function getMaintenanceDetail(id) {

    const requests = await Request.findById(id)
    .populate({ path: "property", select: "_id name" })
    .exec();
    if (requests == null) {
        throw new BaseError(`request does not exist `, 404)
    }
    return formatResponse(200, "Success", "", { requests })
}

module.exports = {
    insertRequest,
    getRequests,
    updateRequestByLandlord,
    deleteRequestByLandlord,
    getMaintenanceDetail
}



