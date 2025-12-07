import jwt from 'jsonwebtoken'

const generateToken = (id, res) =>{
    const token = jwt.sign({id}, process.env.JWT_SEC,{
         expiresIn : "15d",
    })
    res.cookies("token",token, {
        maxAge :15*24*60*1000,
        httponly :true,
        sameSite: "strict",
    })
}


export default generateToken;