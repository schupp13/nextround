SELECT ad.id,ad.ad_title FROM guest 
INNER JOIN ad
ON guest.id = ad.business_id
WHERE guest.id  = $1;