const Comment = require('../models/comment.model')
const respon = require('../helper/responJson');

class CommentServ {
    async addComment(body) {
        let result;
        try {
            const newComment = new Comment({
                name: body.name,
                comment: body.comment
            });
            let data = await Comment.create(newComment)
            let responseTemplate = new respon(200, "Success Create Comment", data)
            result = JSON.stringify(responseTemplate, null, 2)
        } catch (error) {
            throw new Error(error)
        }
        return result
    }
    async findAllComment() {
        let result;
        try {
            let data = await Comment.find().sort({ createdAt: 'ascending' })
            let responTemplate = new respon(200, "Success", data)
            result = JSON.stringify(responTemplate, null, 2)
        }
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async findByID(body) {
        let result;
        try {
            let data = await Comment.findById(body, 'name comment __id createdAt updatedAt')
            let responTemplate = new respon(200, "Success", data)
            result = JSON.stringify(responTemplate, null, 2)
        }
        catch (error) {
            throw new Error(error)
        }
        return result
    }

    async editComment(body) {
        let result;
        try {
            let data = await Comment.findByIdAndUpdate(body._id, body, { new: true })
            let responseTemplate = new respon(200, "Success Update Comment", data)
            result = JSON.stringify(responseTemplate, null, 2)
        }
        catch (error) {
            throw new Error(error)
        }
        return result
    }
    async deleteComment(body) {
        let result;
        try {
            let data = await Comment.findByIdAndRemove(body._id)
            let responTemplate;
            if (data) {
                responTemplate = new respon(200, "Success Delete Comment", data)
            }
            else {
                responTemplate = new respon(201, "Not Found Comment ID", data)
            }

            result = JSON.stringify(responTemplate, null, 2)
        }
        catch (error) {
            throw new Error(error)
        }
        return result
    }
}

module.exports = CommentServ;