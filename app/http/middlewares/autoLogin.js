const { UserModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
    try {
        let authError = { status: 401, success: false, message: "لطفا وارد شوید" };
        const authorization = req?.headers?.authorization;
        if (!authorization) throw authError
        let token = authorization.split(" ")?.[1];
        if (!token) throw authError
        const result = verifyJwtToken(token);
        const { username } = result;
        console.log(result);
        const user = await UserModel.findOne({ username }, { password: 0 });
        if (!user) throw authError
        req.user = user;
        return next();
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkLogin
}