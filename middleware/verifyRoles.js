const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
 
    if (!req?.roles) return res.sendStatus(401);
    
    if (allowedRoles[0]!==req.roles) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
