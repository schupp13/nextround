INSERT INTO ad (business_id, ad_title)
VALUES
   ($1, $2)
   returning id;