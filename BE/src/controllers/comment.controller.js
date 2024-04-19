
const addNewComment = async(req,res,service)=>{
    try {
        const body = req.body;
        const comment = await service.addComment(body)
        res.send(comment)
    } catch (e) {
        res.sendStatus(500);
    }
}

const getComment = async(req,res,service)=>{
    try {
        let comment;
        if(req.params.id){
            comment = await service.findByID(req.params.id)
        }
        else{
            comment = await service.findAllComment()
        }
        res.send(comment)
    } catch (e) {
        res.sendStatus(500)
    }
}

const updateComment = async(req,res,service)=>{
    try {
        const body = req.body;
        const comment = await service.editComment(body)
        res.send(comment)
    } catch (e) {
        res.sendStatus(500);
    }
}

const removeComment = async(req,res,service)=>{
    try {
        const body = req.body;
        const comment = await service.deleteComment(body)
        res.send(comment)
    } catch (e) {
        res.sendStatus(500);
    }
}



module.exports = {addNewComment,getComment,updateComment,removeComment};