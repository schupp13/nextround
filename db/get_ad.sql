SELECT * FROM ad
INNER JOIN guest
ON ad.business_id = guest.id
 WHERE ad.id = $1;