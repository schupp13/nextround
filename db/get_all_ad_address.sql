SELECT ad.id, ad.business_id, guest.address, guest.suite, guest.city, guest.state, guest.zip, ad.ad_title, guest.business_name FROM ad 
INNER JOIN guest
on ad.business_id = guest.id;