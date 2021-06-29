const User = require("../models/user");

module.exports = {
  postUserUpdate: async (req, res) => {
    try {
      if (
        !req.body.password ||
        req.body.password != req.body.confirmation_password
      ) {
        return res.status(400).send({
          error: true,
          message: "Bad request. Passwords do not match.",
        });
      }
      req.body.password = bcrypt.hashSync(req.body.password);
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });

      res.status(201).send({
        messege: "success",
        error: false,
        user,
      });
    } catch (error) {
      res.status(400).send({
        messege: error,
        error: true,
      });
    }
  },
  fetchAllUsers: async (req, res) => {
    // assume try catch
    const users = await User.find();

    res.status(200).send({
      error: false,
      message: "All users are fetched",
      users,
    });
  },
  fetchOneUser: async (req, res) => {
    // assume try catch
    const user = await User.findById(req.params.id);

    res.status(200).send({
      error: false,
      message: `User with id #${req.params.id} fetched`,
      user,
      //recipe
    });
  },
};
