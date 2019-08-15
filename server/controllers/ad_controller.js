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
  }

  // getAdsForCompany: async (req, res) => {
  //   console.log("hit");
  //   // this function gets all of the ads associated with a business
  //   let { id } = req.params;
  //   const db = req.app.get("db");
  //   let allAds = await db.get_ads_for_company([id]).catch(err => {
  //     console.log(err);
  //   });
  //   res.status(200).json(allAds);
  // }
};
