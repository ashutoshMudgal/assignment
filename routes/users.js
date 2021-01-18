var express = require('express');
var router = express.Router();
var crypto = require('crypto');
let models = require("../models")
let redis = require("../redis")
let user = require("../provider/user")
let validateRequest = require("../provider/errorValidation")

router.post('/register',user.userProvider(), validateRequest.validate, async function (req, res, next) {
  try {
    let userExist = await models.users.findOne({ mobile: req.body.mobile })
    if (!userExist) {
      let salt = crypto.randomBytes(16).toString('hex');
      let hash = crypto.pbkdf2Sync(req.body.password, salt,
        1000, 64, `sha512`).toString(`hex`);
      let data = await models.users.create({ mobile: req.body.mobile, password_hash: hash, password_salt: salt })
      res.json(data)
    } else {
      res.status(409).json("user already exist!")
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }

});

router.post('/login', async function (req, res, next) {
  try {
    let userExist = await redis.get(req.body.mobile)
    if (userExist) {
      userExist = JSON.parse(userExist)
    } else {
      userExist = await models.users.findOne({ mobile: req.body.mobile })
      redis.set(req.body.mobile, JSON.stringify(userExist))
    }
    if (userExist) {
      let hash = crypto.pbkdf2Sync(req.body.password, userExist.password_salt,
        1000, 64, `sha512`).toString(`hex`);
      if (hash === userExist.password_hash) {
        res.json(userExist)
      } else {
        res.status(401).json("invalid login!")
      }
    } else {
      res.status(401).json("invalid login!")
    }

  } catch (error) {
    console.log(error)
    res.json(error)
  }
});

module.exports = router;
