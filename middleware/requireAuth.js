// const jwt = require("jsonwebtoken");

// const requireAuth = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const { id } = jwt.verify(token, process.env.SECRET);
//     console.log(id, "id from middleware");

//     req.user = { id };
//     console.log(req.user, "req.user on middleware");

//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "Request is not authorized" });
//   }
// };

// module.exports = requireAuth;
