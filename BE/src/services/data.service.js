const Data = require('../models/data.model')
const respon = require('../helper/responJson');
const { log } = require('../models/index.model');
const moment = require('moment')

class DataServ {
    async addData(req,res) {
        let body = req.body;
        let result;
        try {
            const newData = new Data({
                email: body.email,
                date: new Date(body.date),
                description: body.description,
                user: req.userId
            });
            console.log(newData);
            let data = await Data.create(newData)
            let responseTemplate = new respon(200, "Success Create Data", data)
            result = JSON.stringify(responseTemplate, null, 2)
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
        return result
    }
    async findAllByUserId(req,res) {
        let result;
        try {
            
            let data = await Data.aggregate([
                {
                    $project: {
                        title:"$email",
                        end: "$date",
                        start: "$date",
                        desc: "$description",
                        _id:0
                }
            }
            ]);
            // find({},{ email: 'title', date: 1, description: 'desc' }).sort({ createdAt: 'ascending' }).where('user').equals(req.userId)
            let responTemplate = new respon(200, "Success", data)
            result = JSON.stringify(responTemplate, null, 2)
        }
        catch (error) {
            console.log(error);
            throw new Error(error)
        }
        return result
    }

    // async findByID(body) {
    //     let result;
    //     try {
    //         let data = await Comment.findById(body, 'name comment __id createdAt updatedAt')
    //         let responTemplate = new respon(200, "Success", data)
    //         result = JSON.stringify(responTemplate, null, 2)
    //     }
    //     catch (error) {
    //         throw new Error(error)
    //     }
    //     return result
    // }

    // async editComment(body) {
    //     let result;
    //     try {
    //         let data = await Comment.findByIdAndUpdate(body._id, body, { new: true })
    //         let responseTemplate = new respon(200, "Success Update Comment", data)
    //         result = JSON.stringify(responseTemplate, null, 2)
    //     }
    //     catch (error) {
    //         throw new Error(error)
    //     }
    //     return result
    // }
    // async deleteComment(body) {
    //     let result;
    //     try {
    //         let data = await Comment.findByIdAndRemove(body._id)
    //         let responTemplate;
    //         if (data) {
    //             responTemplate = new respon(200, "Success Delete Comment", data)
    //         }
    //         else {
    //             responTemplate = new respon(201, "Not Found Comment ID", data)
    //         }

    //         result = JSON.stringify(responTemplate, null, 2)
    //     }
    //     catch (error) {
    //         throw new Error(error)
    //     }
    //     return result
    // }
}

module.exports = DataServ;