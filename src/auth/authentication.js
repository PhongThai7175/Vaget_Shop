import db from "../models/index";

let handleAuthentication = async (req,res, next) =>{
    console.log(req.signedCookies)
    if(!req.signedCookies.userId){
        res.redirect('/login')
        return;
    }
    let user = await db.User.findOne( {where: { id: req.signedCookies.userId }})

    if (!user){
        res.redirect('/login');
        return;
    }
    
   res.locals.user = user;
   next();
 
}

module.exports = {
    handleAuthentication:handleAuthentication
}