UPDATE guest
SET business_name= $2, first_name =$3,last_name =$4,phone =$5,email =$6,description=$7, address=$8, suite =$9, city=$10, state=$11,zip=$12
WHERE
   id = $1;