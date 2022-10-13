const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.SECRET);
  console.log(id);

  req.user = { id };
  console.log(req.user);

  next();
};

module.exports = requireAuth;
