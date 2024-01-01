VIDEO STREAMING SERVER
Language : Node js
Database : Mysql Local / MongoDB Local

_______________________DATABASE STRUCTURE_______________________________
user : {
id : auto generated string (10-20 Char),
email : user email address it is uniq
password : hash string of the password (BCRYPT)
}

videos :{
id : auto generated string (userid + timestamp),
title : from client (no any then file name is title),
size : req.file.size,
uploaded_by : user_id,
uploaded_on : timestamp,
views : 0 Default,
}
_________________________________________________________________________

_____________________ Library or Modules ________________________________
main -> express js
view -> ejs
password -> bcrypt
session -> jwt, cookie-parse
cors-origin relative -> cors
database -> mysql2
file upload -> multer
________________________________________________________________________


____________________ 1. File uploading Process _________________________
client [select file] -> server [check user authentication token, make validations on file, uploading file, response file id]


FUNCITONS 
user.js
1. signinUser (check in db, verify and callback)
2. verifyPassword (bcrypt cpmare)
