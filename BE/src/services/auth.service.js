const config = require("../../config/authConfig");
const db = require("../models/index.model");
const { user: User} = db;
const Log = require("../models/log.model");
const respon = require('../helper/responJson');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Auth{
    async signin(req,res){
      User.findOne({
        email: req.body.email,
      })
        
        .exec(async (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          console.log(bcrypt.decodeBase64(user.password));
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );

    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          }
    
          let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
          });

          await Log.create({
            activity: "Login",
            user: user._id
          });

          let responseTemplate = new respon(200, "Success Login", {
            id: user._id,
            name: user.name,
            email: user.email,
          })
          responseTemplate.token = token
          res.status(200).send(responseTemplate);
        });
    };

    async logout(req,res){
      console.log(req.userId);
      await Log.create({
        activity: "Logout",
        user: req.userId
      });
      res.status(200).send({ message: "Logout Success" });
    }
}


module.exports = Auth