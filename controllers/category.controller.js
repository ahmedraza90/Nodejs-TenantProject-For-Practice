const { categoryService } = require("../services");
const { formatResponse } = require("../helpers/utility")

async function insertCategories(req, res) {
  try {
    const response = await categoryService.insertCategories();
    console.log(response)
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

async function findRequested(req, res) {
  try {
    const response = await categoryService.findRequested(req.query);
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
  insertCategories,
  findRequested,
};
