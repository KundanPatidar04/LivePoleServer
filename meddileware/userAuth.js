import jwt from 'jsonwebtoken'

const secretKey = toString(process.env.JWT_secret);

export const verifyUser = (req, res, next) => {
    try{
        const head = req.headers.authtoken;
    const token = head.split(' ')[1];

    if(!token){
        return res.status(401);
    }

    jwt.verify(token, secretKey, (err, user)=>{
        if(err) return res.status(403);
        req.body = user;
        next()
    } )
    }
    catch(error){
        console.log(error);
    }
}
