const bcrypt = require("bcryptjs");

module.exports = {
  register: (req, res) => {
    const {
      businessName,
      firstName,
      lastName,
      phone,
      email,
      password,
      desciption,
      address,
      suite,
      city,
      state,
      zip
    } = req.body;

    if (!firstName || !lastName || !username || !password) {
      res.status(406).json({
        error: "Please fill in all information"
      });
    } else {
      const db = req.app.get("db");
      db.check_for_user([email]).then(user => {
        user.length > 0
          ? res
              .status(401)
              .json(
                "Sorry, but an account has already been created with that email."
              )
          : null;
      });
    }

    res.status(200).json("You you are hitting the endpoint");
  }
};
