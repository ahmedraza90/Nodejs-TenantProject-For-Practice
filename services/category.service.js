const {formatResponse} = require("../helpers/utility")
const Category = require("../model/categories")
const categoriesData = require("../categories.json")
const { BaseError } = require("../helpers/ErrorHandling")

async function insertCategories() {
        await Category.find({}).deleteMany();
        await Category.insertMany(categoriesData);
        return formatResponse(201,"success", "Inserted successfully")

}

async function findRequested(params) {
        const {id, level, parent_id, limit, first} = params;
        let query;
        if (first) query = Category.findOne({});
        else query = Category.find({});
        if (id) query.where('id').equals(id);
        if (level) query.where('level').equals(level);
        if (parent_id) query.where('parent_id').equals(parent_id);
        if (limit) query.limit(limit);
        const data = await query.exec()
        if (data.length==0) {
            throw new BaseError(`category with this ${Object.keys(params)[0]} does not exist`, 404)
        }
        return formatResponse(200, "Success", "", {data})

}

module.exports = {
    insertCategories,
    findRequested
}



