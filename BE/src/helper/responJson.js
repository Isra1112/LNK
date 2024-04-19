class Respon{
    constructor(status,message,data){
        this.status = status;
        this.message = message;
        this.data = data;
        this.role;
        this.token;
        this.page;
        this.pageLimit;
        this.count;
    }
}

module.exports = Respon