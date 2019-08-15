SELECT ad_id,drink_price, drink_name,drink_ingredients 
FROM ad 
INNER JOIN drink
ON ad.id = drink.ad_id
WHERE ad.id = $1;