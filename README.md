# EcommerceLikeFakeStore
Fake store just like "Fake Store API" website (https://fakestoreapi.com/)

any one can add/delete/update
every product or user 
and make any update on every field (like ID or pass)

+++ product +++
----------------

the product looks like this:

"Pid": int,

"Pname": "string",

"Pdiscription": string",

"Picname": "string",

"Price": int

    
-- get all product -- [GET]
---------------------
/product

-- output example --

"Pid": 1,

"Pname": "yogurt",

"Pdiscription": "vegan yogurt",

"Picname": "yogurt.jpg",

"Price": 5


"Pid": 2,

"Pname": "cheese",

"Pdiscription": "vegan cheese",

"Picname": "cheese.jpg",

"Price": 8

---------------------

-- get product by ID -- [GET]
-----------------------
/product/2

-- output example --

"Pid": 2,

"Pname": "cheese",

"Pdiscription": "vegan cheese",

"Picname": "cheese.jpg",

"Price": 8

---------------------

-- delete product by ID -- [DELETE]
-----------------------------------
/product/ id product you want to delete (for example: /product/2 - will delete product with the id 2)

-- output example --
you will get a massege that tells
product deleted with the id of the product

---------------------

-- add product -- [POST]
------------------------
/product

in the body of the request you add the following:

"Pid": "choose product id",

"Pname": "choose product name",

"Pdiscription": "product discription",

"Picname": "pruduct picture name.jpg",

"Price": product price

-- output example --

you will get a massege that tells 

you have added a new product with the product details

---------------------

-- update product -- [PATCH]
-----------------------------
/product/ id product you want to update (for example: /product/2 - will update product with the id 2)

in the body of the request you add the following:

"Pid": "your update",

"Pname": "your update",

"Pdiscription": "your update",

"Picname": "your update.jpg",

"Price": your update

-- output example --

you will get a massege that tells 

you have update the product and the id of the product

---------------------

+++ user +++
-------------

the user looks like this:

"Uid": int,

"FirstName": "string",

"LastName": "string",

"Email": "string",

"Email": "string",

"Pass": "string"

-- register user -- [PATCH]
---------------------------
/user/register

in the body of the  [PATCH] request you add the following:

"Uid":"user id",

"FirstName":"user first name",

"LastName":"user last name",

"Phone":"user phone",

"Email":"user email",

"Adress":"user adress",

"Pass":"user password"

-- output example --

you will get a massege that tells 

you have register new user and all the details

-------------------------

-- login user -- [PATCH]
-------------------------
/user/login

in the body of the  [PATCH] request you add the following:

"Email":"email of the user that in the data (you can register your own user)",

"Pass":"user password"

-- output example --

you will get a massege 

welcome back and a TOKEN (Authontication - no use for it for now)

-------------------------

-- delete user by ID -- [DELETE]
--------------------------------
/user/ id user you want to delete (for example: /user/2 - will delete user with the id 2)

-- output example --

you will get a massege that tells

user deleted with the id of the user

---------------------------------

-- update user -- [PATCH]
--------------------------
/user/ id user you want to update (for example: /user/2 - will update user with the id 2)

in the body of the request you add the following:

"Uid": "your update",

"FirstName": "your update",

"LastName": "your update",

"Phone": "your update",

"Email": your update,

"Adress":"your update",

"Pass":"your update"

-- output example --

you will get a massege that tells 

you have update the user and the id of the user

---------------------














