const { createResponse, formatResponse } = require("../helpers/utility");
const validate = require("../helpers/validationSchema");
const { BaseError } = require("../helpers/ErrorHandling");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { wellComeEmail } = require("../services/mail.service");
const Stripe = require("../helpers/stripeConnect");
const passport = require("passport");

async function register(data) {
  const { firstName, lastName, email, password } = data;
  const response = validate.registerUserSchema.validate({
    firstName,
    lastName,
    email,
    password,
  });

  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    throw new BaseError("User already exist", 400);
  }

  async function generateCode() {
    let str = parseInt(Math.random() * 1000000);
    if (await User.findOne({ emailVerifyToken: str })) {
      generateCode();
      return;
    }
    return str;
  }

  const emailVerifyToken = await generateCode();

  const customerId = await Stripe.addNewCustomer(email);

  await User.create({
    firstName,
    lastName,
    emailVerifyToken,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: await bcrypt.hash(password, 10),
    customerId: customerId.id,
    // role,
    // plan
  });

  wellComeEmail({
    firstName,
    lastName,
    email,
    emailVerifyToken,
    verifyEmailLink: `${process.env.APP_URL}/frontend-url`,
  });

  return formatResponse(
    201,
    "Success",
    "Plz verify your account. Tech-inferno sent you a six digit code"
  );
}

async function login(data) {
  const { email, password } = data;

  if (!(email && password)) {
    throw new BaseError("Email and password is required", 404);
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "48h",
      }
    );

    return formatResponse(200, "Success", "Login Successfully", {
      token,
      user,
    });
  }
  throw new BaseError("Invalid credentials", 404);
}

const verifyEmail = async ({ verifyEmailToken }) => {
  const response = validate.verifyEmailSchema.validate({
    verifyEmailToken,
  });
  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }

  const user = await User.findOne({ emailVerifyToken: verifyEmailToken });
  if (!user) throw new BaseError("Invalid token", 404);
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        emailVerifyToken: null,
        isEmailVerified: true,
      },
    }
  );
  return formatResponse(201, "Success", "User Verified Successfully");
};
const changePassword = async (data, _id) => {
  await User.findOneAndUpdate(
    { _id },
    {
      $set: {
        password: await bcrypt.hash(data.password, 10),
      },
    }
  );
  return formatResponse(201, "Success", "Password Updated Successfully");
};
const userRole = async (data, _id) => {
  const user = await User.findOneAndUpdate(
    { _id },
    {
      $set: {
        role: data.role,
      },
    },
    { new: true }
  );
  return formatResponse(201, "Success", "Role Set Successfully", { user });
};
const userPlan = async (data, _id) => {
  const user = await User.findOneAndUpdate(
    { _id },
    {
      $set: {
        plan: data.plan,
      },
    },
    { new: true }
  );
  return formatResponse(201, "Success", "Plan Set Successfully", { user });
};
const forgotPassword = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BaseError("User with this email not exist", 400);
  }
  async function generateCode() {
    let str = parseInt(Math.random() * 1000000);
    if (await User.findOne({ resetVerifyToken: str })) {
      generateCode();
      return;
    }
    return str;
  }

  const resetVerifyToken = await generateCode();
  // token = jwt.sign(
  //     { _id: user._id },
  //     process.env.JWT_TOKEN_KEY,
  //     {
  //         expiresIn: "2h",
  //     }
  // );

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        resetVerifyToken,
      },
    }
  );
  const { firstName, lastName } = user;
  wellComeEmail({
    firstName,
    lastName,
    email,
    emailVerifyToken: resetVerifyToken,
    verifyEmailLink: `${process.env.APP_URL}/reset-password`,
  });
  return formatResponse(
    201,
    "Success",
    "Your reset verification code has been sent On Your Email"
  );
};
const verifyResetUser = async (data) => {
  const { resetCode } = data;
  // jwt.verify(
  //     resetLink,
  //     process.env.JWT_TOKEN_KEY
  // );
  const response = validate.verifyEmailSchema.validate({
    verifyEmailToken: resetCode,
  });
  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }
  const user = await User.findOne({ resetVerifyToken: resetCode });
  if (!user) throw new BaseError("Invalid token", 404);

  // const password = await bcrypt.hash(newPass, 10);
  // update = {
  //     $set: {
  //         password: password,
  //         resetVerifyToken: null
  //     },
  // };
  // await User.findOneAndUpdate({ _id: user._id }, update, { new: true })
  return formatResponse(201, "Success", "User verified Successfully", {
    resetCode,
  });
};

const resetPassword = async (data) => {
  const { resetCode, newPassword } = data;
  // jwt.verify(
  //     resetLink,
  //     process.env.JWT_TOKEN_KEY
  // );
  const response = validate.verifyEmailSchema.validate({
    verifyEmailToken: resetCode,
  });
  if (typeof response.error !== "undefined") {
    return createResponse(response);
  }
  const user = await User.findOne({ resetVerifyToken: resetCode });
  if (!user) throw new BaseError("Invalid token", 404);

  const password = await bcrypt.hash(newPassword, 10);
  update = {
    $set: {
      password: password,
      resetVerifyToken: null,
    },
  };
  await User.findOneAndUpdate({ _id: user._id }, update, { new: true });
  return formatResponse(201, "Success", "Password Reset Successfully");
};

const googleSignin = async (data) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};
const facebookSignin = async (data) => {
  passport.authenticate("facebook", { scope: "email" });
};

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
  facebookSignin
};
