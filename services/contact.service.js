const validate = require("../helpers/validationSchema")
const { createResponse, formatResponse } = require("../helpers/utility")
const Contact = require("../model/contacts")
const { BaseError } = require("../helpers/ErrorHandling")


async function addContact(data, photo, document, createdBy) {
    let documents = [];
    if (document.length > 0) {
        documents = document.map(file => {
            return file.filename
        });
    }
    const contact = {
        ...data,
        address: JSON.parse(data.address),
        emergencyContact: JSON.parse(data.emergencyContact),
        pets: JSON.parse(data.pets),
        vehicle: JSON.parse(data.vehicle),
        notes: JSON.parse(data.notes),
        createdBy,
        photo,
        documents
    }
    const response = validate.contactSchema.validate(contact)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    await Contact.create(contact);
    return formatResponse(201, "Success", "Inserted successfully")
}

async function updateContact(data, _id, photo, document, createdBy) {
    let documents = [];
    if (document.length > 0) {
        documents = document.map(file => {
            return file.filename
        });
    }
    const remainingDocuments = JSON.parse(data.remainingFiles)
    const contact = {
        ...data,
        address: JSON.parse(data.address),
        emergencyContact: JSON.parse(data.emergencyContact),
        pets: JSON.parse(data.pets),
        vehicle: JSON.parse(data.vehicle),
        notes: JSON.parse(data.notes),
        documents: [...documents, ...remainingDocuments],
        createdBy
    }
    const response = validate.contactSchema.validate(contact)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    if (photo != "") {
        contact.photo = photo
    }
    const result = await Contact.findOneAndUpdate({ _id },
        contact,
        { new: true }
    )
    if (result == null) {
        throw new BaseError(`contact does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}
async function getTenantsByLandlord(createdBy) {

    tenants = await Contact.find({
        $and: [
            { role: "tenant" },
            { createdBy: createdBy }
        ]
    }).exec();
    if (tenants.length == 0) {
        throw new BaseError(`tenants do not exist with this user`, 404);
      }
    return formatResponse(200, "Success", "", { tenants })
}
async function getTenantDetailById(_id) {
    tenant = await Contact.findById(_id)
    if (tenant == null) {
        throw new BaseError(`tenant does not exist `, 404);
      }
    return formatResponse(200, "Success", "", { tenants })
}

async function getProfessionalsByLandlord(createdBy) {

    professionals = await Contact.find({
        $and: [
            { role: "professional" },
            { createdBy: createdBy }
        ]
    }).exec();
    if (professionals.length == 0) {
        throw new BaseError(`professionals do not exist with this user`, 404);
      }
    return formatResponse(200, "Success", "", { professionals })
}
async function getProfessionalDetailById(_id) {

    professional = await Contact.findById(_id)
    if (professional == null) {
        throw new BaseError(`professional does not exist `, 404);
      }
    return formatResponse(200, "Success", "", { professionals })
}
async function getContactDetailById(_id) { 

    const Contact = await Contact.findById(_id)
    if (Contact == null) {
        throw new BaseError(`Contact does not exist `, 404);
      }
    return formatResponse(200, "Success", "", { professionals })
}
async function getContactsByServicePro(createdBy) {

    professionals = await Contact.find({
        $and: [
            { role: "pro" },
            { createdBy: createdBy }
        ]
    }).exec();
    if (professionals.length == 0) {
        throw new BaseError(`professionals do not exist with this user`, 404);
      }
    return formatResponse(200, "Success", "", { professionals })
}



module.exports = {
    addContact,
    getTenantsByLandlord,
    getProfessionalsByLandlord,
    updateContact,
    getContactsByServicePro,
    getProfessionalDetailById,
    getContactDetailById,
    getTenantDetailById
}
