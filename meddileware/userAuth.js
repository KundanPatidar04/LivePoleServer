import jwt from 'jsonwebtoken'
let userRole = '';

const secretKey = toString(process.env.JWT_secret);

export const verifyUser = (req, res, next) => {
    try {
        const head = req.headers.authtoken;
        const token = head && head.split(' ')[1];
        
        if (!token) {
            return res.status(401);
        }

        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(403);
            userRole = user.role;
            next();
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const checkRole = (role) => (req, res, next) => {
    if (userRole !== role) {
        return res.status(403);
    }
    next();
}