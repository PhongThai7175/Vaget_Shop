import db from '../models/index';


import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
            // console.log(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
};
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findOne({
          where: { email: userEmail },
        });
  
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        reject(e);
      }
    });
  };
let handleSignUp = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(data.email);
            if (!isExist) {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({ 
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullname: data.fullname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    positionId : 'P2'
                });
                resolve('Ok')
            }
        }
        catch(e) {
            console.log(e)
            reject(e);
        }
        
    })
}


module.exports = {
    handleSignUp : handleSignUp,
}