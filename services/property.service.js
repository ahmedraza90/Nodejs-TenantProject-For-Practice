const validate = require("../helpers/validationSchema")
const {createResponse, formatResponse} = require("../helpers/utility")
const Property = require("../model/property")
var fs = require('fs');
const Lease = require("../model/leases")
const Request = require("../model/request")
const Listing = require("../model/listing")
const { BaseError } = require("../helpers/ErrorHandling")

async function addProperty(data,propertyPhoto,propertyAttachmentss,createdBy) {
    // let propertyImageGallery = [];
    // if (propertyImageGalleryy.length > 0) {
    //     propertyImageGallery = propertyImageGalleryy.map(file => {
    //         return  file.filename 
    //     });
    // }
    let propertyAttachments = [];
    if (propertyAttachmentss.length > 0) {
        propertyAttachments = propertyAttachmentss.map(file => {
            return  file.filename 
        });
    }
    const property = {
        ...data,
        unitInfo : JSON.parse(data.unitInfo),
        createdBy,
        propertyPhoto,
        // propertyImageGallery,
        propertyAttachments
    }
    const response = validate.propertySchema.validate(property)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    await Property.create(property);
    return formatResponse(201,"Success", "Inserted successfully")
}
async function getPropertiesByLandlord(createdBy) {

    const properties = await Property.find({createdBy})
    if (properties.length == 0) {
        throw new BaseError(`properties do not exist with this user`, 404);
      }
    return formatResponse(200,"Success", "", {properties})
}
async function getPropertyDetailById(_id) {

    const property = await Property.findById(_id)
    if (property == null) {
        throw new BaseError(`property does not exist `, 404);
      }
    return formatResponse(200,"Success", "", {properties})
}
async function updateProperty(data,_id,propertyPhoto,propertyAttachmentss,createdBy) {
    // data.deleteFiles.map(file => {
    //     fs.unlinkSync(`public/${file}`);
    // });
    // let propertyImageGallery = [];
    // if (propertyImageGalleryy.length > 0) {
    //     propertyImageGallery = propertyImageGalleryy.map(file => {
    //         return file.filename
    //     });
    // }
    let propertyAttachments = [];
    if (propertyAttachmentss.length > 0) {
        propertyAttachments = propertyAttachmentss.map(file => {
            return  file.filename 
        });
    }
    const remainingDocuments = JSON.parse(data.remainingFiles)
    const property = {
        ...data,
        unitInfo : JSON.parse(data.unitInfo),
        propertyAttachments : [...propertyAttachments,...remainingDocuments ],
        createdBy
    }
    const response = validate.propertySchema.validate(property)
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    if(propertyPhoto != ""){
        property.propertyPhoto = propertyPhoto
    }
    updatedProperty = await Property.findOneAndUpdate({ _id },
        property,
        { new: true }
    )
    if (updatedProperty == null) {
        throw new BaseError(`Property does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}

async function deletePropertyByLandlord(_id, createdBy) {
    const property = await Property.findOneAndDelete({ $and: [
        { _id: _id },
        { createdBy: createdBy }
    ] }
    )
    if (property == null) {
        throw new BaseError(`Property does not exist `, 404)
    }
    return formatResponse(202, "Success", "Deleted successfully")
}
async function filterProperty(params) {
    if(Object.keys(params).length==0){
        return formatResponse(200,"Success", "", {})
    }
    console.log(params.search)
    const properties = await Property.find({ "streetAddress": { "$regex": `${params.search}`,"$options": "i"} })
    if (properties.length == 0) {
        throw new BaseError(`Not found`, 404);
      }
    return formatResponse(200,"Success", "", {properties})
} 
module.exports = {
    addProperty,
    getPropertiesByLandlord,
    updateProperty,
    deletePropertyByLandlord,
    getPropertyDetailById,
    filterProperty
}



