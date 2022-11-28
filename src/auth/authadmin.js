import db from "../models/index";

let authAdmin = async (req,res, next) =>{

    if(!req.signedCookies.userId){
        res.redirect('/login')
        return;
    }
    let user = await db.User.findOne( {where: { id: req.signedCookies.userId }})

    if (!user){
        res.redirect('/login');
        return;
    }
    if (user && user.positionId === 'P1'){
        res.locals.user = user;
        next();
    }else{
        res.render('partials/error.ejs')
    }
  
 
}

module.exports = {
    authAdmin:authAdmin
}