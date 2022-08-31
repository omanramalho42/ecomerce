const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if(authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC), (err, user) => {
        if(err) res.status(403).json('Token não é válido');
        req.user = user;
        next();
      };
    } else {
      return res.status(401).json('Você não está autenticado');
    }
  } catch(error) {
    res.status(500).json(error);
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if(req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json('Você não tem permissão para fazer isso');
      }
    });
  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = { verifyToken, verifyTokenAndAuthorization };