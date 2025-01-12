import jwt from "jsonwebtoken";


export const isAuthenticated =  async(req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log("Token", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log("Decode", decode);

        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        req.id = decode.userId

        next()
    } catch (error) {
        console.log(error);

    }
}