const Reminder = require('../model/reminder')
const validate = require("../helpers/validationSchema");
const { createResponse, formatResponse } = require("../helpers/utility");
const { BaseError } = require("../helpers/ErrorHandling")


async function insertReminder(data,createdBy) {
    const reminder = {
        ...data,
        createdBy
    }
    const response = await validate.reminderSchema.validate(reminder)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    await Reminder.create(reminder)
    return formatResponse(201,'success', 'Inserted successfully')
}


async function getReminders(createdBy) {
    const reminders = await Reminder.find({createdBy}).exec();
    if (reminders.length == 0) {
        throw new BaseError(`reminders do not exist with this user`, 404);
      }
    return formatResponse(200,"Success", "", {reminders})
}
async function getReminderDetailById(createdBy,id) {
    const reminder = await Reminder.findById(_id)
    if (reminder == null) {
        throw new BaseError(`reminder does not exist `, 404);
      }
    return formatResponse(200,"Success", "", {reminders})
}

async function updateReminder(data, _id,createdBy) {
    const reminder = {
        ...data,
        createdBy
        
    }
    const response = await validate.reminderSchema.validate(reminder)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    const result = await Reminder.findOneAndUpdate({ _id },
        data,
        { new: true }
    )
    if (result == null) {
        throw new BaseError(`reminder does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}
async function deleteReminder(_id, createdBy) {
    const result = await Reminder.findOneAndDelete({ $and: [
        { _id: _id },
        { createdBy: createdBy }
    ] }
    )
    if (result == null) {
        throw new BaseError(`reminder does not exist `, 404)
    }
    return formatResponse(202, "Success", "Deleted successfully")
}

module.exports = {
    insertReminder,
    getReminders,
    updateReminder,
    deleteReminder,
    getReminderDetailById
}