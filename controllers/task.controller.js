const { taskService } = require("../services")
const { formatResponse } = require("../helpers/utility")

async function insertTask(req, res) {
    try {
        const response = await taskService.insertTask(req.body, req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}
async function getTasks(req, res) {
    try {
        const response = await taskService.getTasks(req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}

async function updateTasks(req, res) {
    try {
        const { id } = req.params
        const response = await taskService.updateTask(req.body, id,req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}
async function deleteTask(req, res) {
    try {
        const { id } = req.params
        const response = await taskService.deleteTask(id, req.id);
        if (response) {
            return res
                .status(response.statusCode)
                .json(response);
        }

    } catch (error) {
        const { message, statusCode } = error;
        res.status(statusCode || 500).json(formatResponse(statusCode || 500, "error", message));
    }
}

module.exports = {
    insertTask,
    getTasks,
    updateTasks,
    deleteTask
}