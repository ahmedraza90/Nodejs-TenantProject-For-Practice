const validate = require("../helpers/validationSchema");
const User = require("../model/user")
const { BaseError } = require("../helpers/ErrorHandling");
const { createResponse, formatResponse } = require("../helpers/utility")



async function userDetail(_id) {
    const user = await User.findOne({_id},'firstName lastName companyName avatar')  
    
    if (user.length==0) {
        throw new BaseError(`user does not exist`, 404)
    }
    return formatResponse(200,"Success", "", {user})
}

async function userUpdate(_id,data) {
    
    const userData = {
        ...data
      };
      console.log(userData)
    const response = validate.updateUserSchema.validate(userData);
    if (typeof response.error !== "undefined") {
        return createResponse(response);
    }
    const user = await User.findOneAndUpdate({_id},
        userData,
        { new: true }
    )  
    
    if (user.length==0) {
        throw new BaseError(`user does not exist`, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}

async function userDelete(id) {
  
    const user = await User.findOneAndDelete({id})  
    
    if (user.length==0) {
        throw new BaseError(`user does not exist`, 404)
    }
    return formatResponse(202, "Success", "Updated successfully")
}

module.exports = {
    userDetail,
    userUpdate,
    userDelete
}
