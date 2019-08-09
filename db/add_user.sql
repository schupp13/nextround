INSERT INTO guest 
(business_name, first_name,last_name,phone,email, password,desciption, address, suite, city, state,zip)
 VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9, $10, $11, $12)

 returning *;