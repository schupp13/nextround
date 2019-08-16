module.exports = {
  getDrinksForAds: async (req, res) => {
    let { id } = req.params;
    let db = req.app.get("db");

    let drinks = await db.get_drinks_for_ad(id).catch(err => console.log(err));

    res.status(200).json(drinks);
  }
};
