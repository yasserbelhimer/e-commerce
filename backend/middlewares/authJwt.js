const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.model");


const withAuth = async (req, res, next) => {
    try{
        const token = req.header("x-access-token")
        if (!token) {
            return res
            .status(401)
            .json({msg:'Unauthorized: No token provided'});
        } 
            
        const verified = jwt.verify(token, process.env.secret);
        if(!verified){
            return res
            .status(401)
            .json({msg:'Unauthorized: Invalid token'})
        }
        Admin.findOne({email:verified.email}).then((res) => {
            req.user = res
            next()
        })
		.catch((err) => res.status(400).json("Error: " + err));
        // req.user = verified.email
        
    }
    catch(err){
        return res
        .status(500)
        .json({error: err.message});
    }
}

module.exports = withAuth;