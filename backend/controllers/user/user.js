const User = require("../../models/user/userModel");

const login = async(req, res) => {
  const { email: loggedEmail, sub, name } = req.body
  
  const isUser = await User.findOne({sub})
  if (isUser) {
    if (isUser.email == loggedEmail) return res.status(201).json({"message": "success", "user": isUser})
    const user = await User.findOneAndUpdate({sub}, {email: loggedEmail})
    return res.status(201).json({"message": "Email Changed", user})
  }
  const user = await User.create({
    sub,
    name,
    email: loggedEmail
  })
  return res.status(201).json({"message": "success", user})
}

module.exports = {
  login
};
