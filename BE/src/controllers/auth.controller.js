const login = async (req, res, service) => {
    try {
        await service.signin(req,res);
    } catch (e) {
        res.status(500);
            res.json(e.message)
    }
};

const logout = async (req, res, service) => {
    try {
        await service.logout(req,res);
    } catch (e) {
        res.status(500);
            res.json(e.message)
    }
};



module.exports = { login,logout };