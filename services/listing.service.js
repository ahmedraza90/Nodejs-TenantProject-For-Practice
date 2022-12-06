const validate = require("../helpers/validationSchema")
const { createResponse, formatResponse } = require("../helpers/utility")
const Listing = require("../model/listing")
const Property = require("../model/property")
const { BaseError } = require("../helpers/ErrorHandling")

async function addListing(data, createdBy) {
    const listing = {
        createdBy,
        ...data
    }
    const response = validate.listingSchema.validate(listing)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    await Listing.create(listing);
    return formatResponse(201, "Success", "Inserted successfully")
}


async function getListingByLandlord(createdBy) {

    const listing = await Property.find({ createdBy }).exec();
    if (listing.length==0) {
        throw new BaseError(`listing do not exist with this user`, 404)
    }
    return formatResponse(200, "Success", "", { listing })
}

async function updateListing(data, _id, createdBy) {
    const listing = {
        ...data,
        createdBy
    }
    const response = validate.listingSchema.validate(listing)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    const result = await Listing.findOneAndUpdate({ _id },
        listing,
        { new: true }
    )
    if (result == null) {
        throw new BaseError(`listing does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}

module.exports = {
    addListing,
    getListingByLandlord,
    updateListing
}