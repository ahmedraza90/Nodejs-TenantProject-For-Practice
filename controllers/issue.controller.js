const {issueService} = require("../services")
const { createResponse, formatResponse } = require("../helpers/utility")

async function insertIssues(req, res) {
    try {
    const response = await issueService.insertIssues(req.body,req.id);
    if (response) {
        return res.status(response.statusCode).json(response);
      }
    } catch (error) {
      const { message, statusCode } = error;
      res
        .status(statusCode || 400)
        .json(formatResponse(statusCode || 400, "error", message));
    }
}

async function getIssues(req, res) {
  try {
    const response = await issueService.getIssues();
    if (response) {
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    const { message, statusCode } = error;
    res
      .status(statusCode || 400)
      .json(formatResponse(statusCode || 400, "error", message));
  }
}

module.exports = {
    insertIssues,
    getIssues
}
