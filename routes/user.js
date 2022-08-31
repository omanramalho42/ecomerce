const { verifyTokenAndAuthorization } = require('./verifyToken');
const User = require('../models/User');
const CryptoJS = require('crypto-js');

const router = require('express').Router();
//GET
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if(!user) res.status(401).json('Este usuário não existe');

    const { password, ...users } = user._doc;

    res.status(200).json(users);
  } catch(error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/findAllUsers", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const query = req.query.new
    
    const users = query 
      ? await User.find().sort({_id:-1}).limit(5) 
      : await User.find();

    if(users.length === 0) res.status(401).json('Não existe usuários cadastrados');

    res.status(200).json(users);
  } catch(error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  };

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
        $set: req.body
      }, 
      { new: true });
  
    res.status(200).json(updateUser);
  } catch(error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json(userDeleted);
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;