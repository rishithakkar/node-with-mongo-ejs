const { response } = require("express");
const jwt = require("jsonwebtoken");

// Admin authorization
exports.adminAuthorization = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next({ name: "Unauthorized", message: "Unauthorized user!" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    if (data.role === "Admin") {
      req.userId = data.id;
      req.userRole = data.role;
      return next();
    }
    return next({ name: "Unauthorized", message: "Unauthorized user!" });
  } catch {
    return res.sendStatus(403);
  }
};

// 403: server understood the request but refuses to authorize it

// General Authorization
exports.authorization = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next({ name: "Unauthorized", message: "Unauthorized user!" });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET);
    console.log("data: ", data);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
