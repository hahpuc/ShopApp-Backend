import jwt from 'jsonwebtoken';

// Wants to see posts
// click the like button => auth middleware (next) => like controller ...
const auth = async (req, res, next) => {

    try {
        var token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.AUTH_KEY);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        res.status(401).json({
            code: 401,
            error: error.message
        })
    }
}

export default auth;
