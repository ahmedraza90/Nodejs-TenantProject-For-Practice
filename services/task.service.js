const Task = require('../model/task')
const validate = require("../helpers/validationSchema");
const { BaseError } = require("../helpers/ErrorHandling")
const { createResponse, formatResponse } = require("../helpers/utility");


async function insertTask(data,createdBy) {
    const task = {
        ...data,
        createdBy
    }
    const response = await validate.taskSchema.validate(task)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    await Task.create(task)
    return formatResponse(201,'success', 'Inserted successfully')
}
async function getTasks(createdBy) {
    const tasks = await Task.find({createdBy}).exec();
    if (task.length == 0) {
        throw new BaseError(`tasks do not exist with this user`, 404);
      }
    return formatResponse(200,"Success", "", {tasks})
}

async function updateTask(data, _id,createdB) {
    const task = {
        ...data,
        createdBy
    }
    const response = await validate.taskSchema.validate(task)
    if (typeof response.error !== 'undefined') {
        return createResponse(response)
    }
    const result = await Task.findOneAndUpdate({ _id },
        data,
        { new: true }
    )
    if (result == null) {
        throw new BaseError(`task does not exist `, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}
async function deleteTask(_id, createdBy) {
    const result = await Task.findOneAndDelete({ $and: [
        { _id: _id },
        { createdBy: createdBy }
    ] }
    )
    if (result == null) {
        throw new BaseError(`task does not exist `, 404)
    }
    return formatResponse(202, "Success", "Deleted successfully")
}

module.exports = {
    insertTask,
    getTasks,
    updateTask,
    deleteTask
}