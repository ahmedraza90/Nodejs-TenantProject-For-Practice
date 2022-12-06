const validate = require("../helpers/validationSchema")
const {createResponse, formatResponse} = require("../helpers/utility")
const Lease = require("../model/leases")
const { BaseError } = require("../helpers/ErrorHandling")

async function addLease(data,leaseDocumentss,createdBy) {
    
    let leaseDocuments = [];
    if (leaseDocumentss.length > 0) {
        leaseDocuments = leaseDocumentss.map(file => {
            return  file.filename 
        });
    }
    const lease = {
        createdBy,
        leaseDocuments,
        ...data,
        tenant : JSON.parse(data.tenant),
        rentSetting : JSON.parse(data.rentSetting),
        depositInfo : JSON.parse(data.depositInfo),
        insurance : JSON.parse(data.insurance),
    }
    const response = validate.leaseSchema.validate(lease)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    await Lease.create(lease);
    return formatResponse(201,"Success", "Inserted successfully")
}
async function getLeaseByLandlord(createdBy) {

    const lease = await Lease.find({createdBy}).exec();
    if (lease.length==0) {
        throw new BaseError(`lease does not exist with this user`, 404)
    }
    return formatResponse(200,"Success", "", {lease})
}
async function getLease(createdBy,tenantId) {

    const lease = await Lease.find({
        $and: [{ tenant: tenantId }, { createdBy: createdBy }],
      },'property')
    .populate({ path: "property", select: "_id name streetAddress propertyPhoto propertyType rent" })
    .exec();
    if (lease.length==0) {
        throw new BaseError(`lease does not exist with this user`, 404)
    }
    return formatResponse(200,"Success", "", {lease})
}

module.exports = {
    addLease,
    getLeaseByLandlord,
    getLease
}