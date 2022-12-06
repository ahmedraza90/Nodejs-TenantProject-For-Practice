const { authService } = require("../services");
const { formatResponse } = require("../helpers/utility");

async function register(req, res) {
  try {
    const response = await authService.register(req.body);
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

async function login(req, res) {
  try {
    const response = await authService.login(req.body);
    if (response) {
      return res.status(response.statusCode).json(response);
    }
    // res.status(200).json(formatResponse("success", "Login Successfully", response));
  } catch (error) {
    const { message, statusCode } = error;
    res
      .status(statusCode || 400)
      .json(formatResponse(statusCode || 400, "error", message));
  }
}
async function changePassword(req, res) {
  try {
    const response = await authService.changePassword(req.body, req.id);
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
async function userRole(req, res) {
  try {
    const response = await authService.userRole(req.body, req.id);
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
async function userPlan(req, res) {
  try {
    const response = await authService.userPlan(req.body, req.id);
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
async function forgotPassword(req, res) {
  try {
    const response = await authService.forgotPassword(req.body);
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
async function resetPassword(req, res) {
  try {
    const response = await authService.resetPassword(req.body);
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
async function verifyResetUser(req, res) {
  try {
    const response = await authService.verifyResetUser(req.body);
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

async function verifyEmail(req, res) {
  try {
    const response = await authService.verifyEmail(req.body);
    if (response) {
      return res.status(response.statusCode).json(response);
    }
    // return res.status(200).json(formatResponse("success", "Email verified successfully"))
  } catch (error) {
    const { message, statusCode } = error;
    res
      .status(statusCode || 400)
      .json(formatResponse(statusCode || 400, "error", message));
  }
}


async function googleSignin(req, res) {
    try {
      const response = await authService.googleSignin(req.body);
      if (response) {
        return res.status(response.statusCode).json(response);
      }
      // return res.status(200).json(formatResponse("success", "Email verified successfully"))
    } catch (error) {
      const { message, statusCode } = error;
      res
        .status(statusCode || 400)
        .json(formatResponse(statusCode || 400, "error", message));
    }
  }

async function facebookSignin(req, res) {
    try {
      const response = await authService.facebookSignin(req.body);
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
  register,
  login,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  userRole,
  userPlan,
  verifyResetUser,
  googleSignin,
  facebookSignin,
};
