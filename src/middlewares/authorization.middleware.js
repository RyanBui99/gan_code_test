const SECRET_TOKEN = "dGhlc2VjcmV0dG9rZW4="; // Usually this is stored in .env file

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (token === SECRET_TOKEN) {
    next();
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
