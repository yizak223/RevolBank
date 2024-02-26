const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    try {
        const userToken = req.header("authorization");
        if (!userToken) {
            return res.status(401).send("UnAuthorized")
        }
        const token = userToken.split(" ")[1];
        const payload = verifyToken(token)

        if (!payload) return res.status(401).send("UnAuthorized")
        req.user = payload
        next()
    } catch (err) {
        return res.status(401).send("UnAuthorized")
    }
}
const authorize = (roles) => {
    console.log(roles);
    return (req, res, next) => {
        const user = req.user
        //if (user.roles === role) next()
        if (roles.includes(user.role)) next()
        else return res.status(401).send("UnAuthorized")
    }
}
module.exports = { auth, authorize }