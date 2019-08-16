SELECT*
FROM ad 
INNER JOIN drink
ON ad.id = drink.ad_id
WHERE ad.id = $1;