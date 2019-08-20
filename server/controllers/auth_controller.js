const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const {
      businessName,
      firstName,
      lastName,
      phone,
      email,
      password,
      description,
      address,
      suite,
      city,
      state,
      zip
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(406).json({
        error: "Please fill in all information"
      });
    } else {
      const db = req.app.get("db");
      const user = await db
        .check_for_user([email])
        .catch(err => console.log(err));
      if (user[0]) {
        res.status(401).json({ error: "Username already taken" });
      } else {
        const hash = await bcrypt
          .hash(password, 10)
          .catch(err => console.log(err));
        let regUser = await db.add_user([
          businessName,
          firstName,
          lastName,
          phone,
          email,
          hash,
          description,
          address,
          suite,
          city,
          state,
          zip
        ]);

        req.session.user = {
          ...regUser[0],
          ad: []
        };

        delete req.session.user.password;
        console.log(req.session.user);
        res.status(200).json(req.session.user);
      }
    }
  },
  login: async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(406).json({
        error: "Please fill in all information"
      });
    } else {
      const db = req.app.get("db");
      let user = await db.check_for_user([email]).catch(err => {
        err;
      });
      if (!user[0]) {
        return res.sendStatus(403);
      }
      let access = await bcrypt.compare(password, user[0].password);
      if (!access) {
        res.sendStatus(403);
      } else {
        req.session.user = {
          ...user[0],
          ad: []
        };
        delete req.session.user.password;
        res.status(200).json(req.session.user);
      }
    }
  },
  getSession: (req, res) => {
    req.session.user ? res.json(req.session.user) : res.sendStatus(403);
  },
  logout: (req, res) => {
    console.log(req.session);
    req.session.destroy();
    res.sendStatus(200);
  },
  edit: async (req, res) => {
    const {
      id,
      businessName,
      firstName,
      lastName,
      phone,
      email,
      description,
      address,
      suite,
      city,
      state,
      zip
    } = req.body;
    const db = req.app.get("db");

    await db
      .update_profile([
        id,
        businessName,
        firstName,
        lastName,
        phone,
        email,
        description,
        address,
        suite,
        city,
        state,
        zip
      ])
      .catch(err => {
        console.log(err);
      });

    let user = await db.get_company([id]).catch(err => {
      console.log(err + "edit funciton in auth controller line 129");
    });

    req.session.user = {
      ...user[0]
    };
    delete req.session.user.password;
    res.status(200).json(req.session.user);
  }
};
