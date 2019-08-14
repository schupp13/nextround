module.exports = {
  getCompany: (req, res) => {
    console.log("hit");
    const db = req.app.get("db");
    db.get_company([req.session.user.id])
      .then(response => {
        console.log(response);
        res.json(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
