const validate = require("../helpers/validationSchema");
const { createResponse, formatResponse } = require("../helpers/utility");
const Application = require("../model/application");
const { BaseError } = require("../helpers/ErrorHandling");

async function insertApplication(data, applicantPhoto, createdBy) {
  
  const application = {
    ...data,
    vehicle: JSON.parse(data.vehicle),
    pets: JSON.parse(data.pets),
    additionalOccupants: JSON.parse(data.additionalOccupants),
    rentalHistory: JSON.parse(data.rentalHistory),
    employmentHistory: JSON.parse(data.employmentHistory),
    additionalIncomes: JSON.parse(data.additionalIncomes),
    emergencyContacts: JSON.parse(data.emergencyContacts),
    references: JSON.parse(data.references),
    createdBy,
    applicantPhoto,
  };
  const response = await validate.aplicationSchema.validate(application);
  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }
  await Application.create(application);
  return formatResponse(201, "success", "Inserted successfully");
}

async function getApplication(createdBy) {
  const applications = await Application.find({ createdBy }).exec();
  if (applications.length == 0) {
    throw new BaseError(`applications do not exist with this user`, 404);
  }
  return formatResponse(200, "Success", "", { applications });
}
async function getApplicationDetailById(id) {
  const application = await Application.findById(id);
  if (application == null) {
    throw new BaseError(`application does not exist `, 404);
  }
  return formatResponse(200, "Success", "", { application });
}

async function updateApplication(data, _id, applicantPhoto,createdBy) {
  const application = {
    ...data,
    vehicle: JSON.parse(data.vehicle),
    pets: JSON.parse(data.pets),
    additionalOccupants: JSON.parse(data.additionalOccupants),
    rentalHistory: JSON.parse(data.rentalHistory),
    employmentHistory: JSON.parse(data.employmentHistory),
    additionalIncomes: JSON.parse(data.additionalIncomes),
    emergencyContacts: JSON.parse(data.emergencyContacts),
    references: JSON.parse(data.references),
    createdBy,
  };
  const response = await validate.aplicationSchema.validate(application);
  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }
  if (applicantPhoto != "") {
    application.applicantPhoto = applicantPhoto;
  }
  const result = await Application.findOneAndUpdate({ _id }, application, {
    new: true,
  });
  if (result == null) {
    throw new BaseError(`application does not exist `, 404)
}
  return formatResponse(202, "Success", "Updated successfully");
}
async function deleteApplication(_id, createdBy) {
  const application = await Application.findOneAndDelete({
    $and: [{ _id: _id }, { createdBy: createdBy }],
  });
  if (application == null) {
    throw new BaseError(`application does not exist `, 404);
  }
  return formatResponse(202, "Success", "Deleted successfully");
}

module.exports = {
  insertApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  getApplicationDetailById,
};
