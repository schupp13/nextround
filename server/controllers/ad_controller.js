module.exports = {
  createAd: async (req, res) => {
    let { id, ad_name, drinks } = req.body;
    console.log(id, ad_name, drinks);
    const db = req.app.get("db");
    let adId = await db.create_ad([id, ad_name]).catch(err => console.log(err));
    console.log(adId);
    drinks.forEach(async drink => {
      let ingredients = drink.ingredients.join(",");
      await db
        .add_drink([
          //adId is comming from the awiat function above
          Number(adId[0].id),
          drink.drinkName,
          drink.drinkPrice,
          drink.image,
          ingredients
        ])
        .catch(err => console.log(err));
    });

    res.sendStatus(200);
  },

  getAdsForCompany: async (req, res) => {
    console.log("hit");
    // this function gets all of the ads associated with a business
    let { id } = req.params;
    const db = req.app.get("db");
    let allAds = await db.get_ads_for_company([id]).catch(err => {
      console.log(err);
    });
    res.status(200).json(allAds);
  },

  deleteAd: async (req, res) => {
    let { id } = req.params;
    console.log("hitting");
    console.log(id);
    const db = req.app.get("db");
    await db.delete_drinks_of_ad([id]).catch(err => {
      console.log(err);
    });
    await db.delete_ad([id]).catch(err => {
      console.log(err);
    });

    let ads = await db
      .get_ads_for_company([req.session.user.id])
      .catch(response => {
        console.log(response);
      });

    res.status(200).json(ads);
  },

  allAds: async (req, res) => {
    let db = req.app.get("db");
    let allAds = await db.get_all_ads().catch(err => console.log(err));
    res.status(200).json(allAds);
  },

  allAdsAddress: async (req, res) => {
    let db = req.app.get("db");
    let allAdAdress = await db.get_all_ad_address().catch(err => {
      console.log(err);
    });
    res.status(200).json(allAdAdress);
  },
  getSingleAd: async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let db = req.app.get("db");
    let ad = await db.get_ad([id]).catch(err => {
      console.log(err);
    });
    console.log(ad);
    res.status(200).json(ad);
  }
};
