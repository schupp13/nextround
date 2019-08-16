module.exports = {
  getCompany: (req, res) => {
    console.log("hit");
    const db = req.app.get("db");
    db.get_company([req.session.user.id])
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getCompanyForAdBuilder: (req, res) => {
    console.log(`getCompanyForAdBuilder is hitting`);
    let { id } = req.params;
    console.log(req.params);
    const db = req.app.get("db");
    db.get_company([id])
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
