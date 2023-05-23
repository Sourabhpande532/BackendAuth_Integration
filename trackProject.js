/* 
@@--P[1]--@@
♦️🙄🙋✍️♦️ ----Heading----- :=>> register a user in auth system;

👩‍💻♦️🤔which one is job this routes "app.post("/register",(req,res)=>{})";

-🛕@get all info

 how to be define it this is going to "/register" or "/login" that is totally a call of backend developer on the frontent you can make any route whatever you feel but at the end of the day collecting that information and sending this routes is the job of frontend developer all up to frontend developer.

 @🧐Note: we never ask for token,we gave the token,we generate the token & stored that into model itself.
 @🧐Note:express can not handled json file directly it need to use middleware for that "app.use(express.json())" it needs to be always at top.because this route already done belew one.
 
 -🛕@check mandatory and validation field

  ref:=> 🖇️https://mongoosejs.com/docs/validation.html
  Let's Look only above one ☝️ in this one we use own validation. 
  -😏Explaination: we need to check essitionally weather the all information is coming or not
  @🧐Note: No need to mention "return" keyword O.W it won't further executed.

  -🛕 check already registered
  ref:=> 🖇️https://mongoosejs.com/docs/api/model.html#Model.findOne()

  -😏Explaination: want provide some parameter & base on that grabbed some data
  - want to immediately executed just write ".exec()"


------------------------)))------------------------------------))---

♦️🙄🙋✍️♦️ ----Heading----- :=>> Database system in auth system;

@🧐Note: Database is always in another contenent as long as remember this everything seems like easy.
@🧐Note: such kind of operation always takes too time so for that promises came into play we use "async" and "await"

@🙋📂visitFiles@
-📂 config/database.js
 useNewUrlParser:=> ?why:=> previously mongoDb was using some kind of parser & they updated it now they want to pass on the flag.
 @🧐Note: No need to hold this into variable just run it directly require("./config/database").connect()

 👩‍💻♦️🤔 what is middleware? 
 => which is coming in between it is know as middleware

♦️🙄🙋✍️♦️ Heading :=>> Handling password situation;

🖇️ https://mongoosejs.com/docs/middleware.html
@focus: majoraly focus on @pre & @post .......

in this one we'r discussing about some middleware kind of stuff that we previously theory discussed now come to practicle one what the middleware do in the case of "Mongoose" it gives you mainly two two types of middleware some people they called as lifecylcles "hooks" let's dig up down of two methods pre and post
@pre => @#defination -> Pre middleware functions are executed one after another, when each middleware calls next.
🖇️https://mongoosejs.com/docs/middleware.html#error-handling

-so you can define your schema (...) it mean whatever you decide to -have first name,email,password lastname whatever you have, have it.
-now am saying schema.pre by the term schema means whatever object you created just inject that. 
-inside that am passing hooks that is "save"(this is basically a event,so mean befour hitting a "save" use this 'pre' + for to do write functions that only thing that you need to worry don't use arrow functions make sure next being it inclueded there), + pass next() onece after done!
-😶‍🌫️@task =>
-🫣take the password form model which is being pass to use +
-🫣just we've to encrypted password.

Now,🤔How,we'r gonna encrypted that is question go and check
@options:
-crypto-js
-bcrypt (it just library to encrpt)
-bcrypt-js (we'r gonna use this bcrypt-js it's built on top of bcrypt but bcrypt.js is more compatible & what benifits brings on table is that you can compare and check the password rather complex stuff) 
#ref: 🖇️https://www.npmjs.com/package/bcryptjs

➡️Go-app.js 

@Identifire:[🤖(-)]
Now,once you done let's go ahead & construct the user bcz this is object that will be monitaring/handling over to mongoose just go ahead & save it just process of saving this to DB it's entirely depends on model/user.js

------------------------)))------------------------------------))---


♦️🙄🙋✍️♦️ -----Heading----- :=>>  what is Jwt & creating token??
 imp str =>

 @🤔sideNote:JWT treat them as password,key 
 @🤔sideNote: => -treat Token as your car key 
 @🤔sideNote: => -Expire the token 
   😈@BaseOn => Header | Payload | Signature

@about: It Base on Generating Some kind of info that token is carrying arround so that information literally inside the token when you docode then you need extract also

 @🤔sideNote: Don't pass password inside Payload only for (email,Id)
 ref: 🖇️ https://jwt.io/introduction

 🤨 what is jwt credentials 👀?
  JWTs are credentials, which can grant access to resources so treat them as password.

 😶‍🌫️@ref: 👋🖇️https://www.npmjs.com/package/jsonwebtoken

 When should you use JSON Web Tokens?
 -Authorization:
 -Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
 - Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:
 
 -Information Exchange:
  we'r allowing user to create something into Database
  @🤔sideNote: Algorithm: SHA256, HMAC
  @🤔sideNote: jwt.sign(payload, secretOrPrivateKey, [options, callback])
  @🤔sideNote: Always varify the stuff by the term it just decode the stuff what decode atucally gives us atucally you payload being extract when decode the information.
  @🤔sideNote:
  we don't pass Algorithm we would be rather passing something when it expires
  @🤔sideNote:while passing something into payload mantra
  - As soon as you save some value into DBs in mongoose atucally it gives a "unique ID" & that object id we access via user variable that we created line no. 34 arround.
  we can also do with "User" model user but it's not good practice
  --
  @🤔sideNote: Need to pass privateId base on that we'r genating token inside payload.

  @Identifire[🤡]
    once the token is created since my model atually allows me to simply say user.token = token just assumes that it update the stuff 
    🛕♦️am i going to update this into a DBs as well that is totally a strategies(update or not in DB) may be you want to stored again something into Dbs itself you can again go ahead & save this into DBs. 
    🛕♦️ If anybudy try to access any resource you can check and take that token & befour even the varify the token whether there is already exists in that user property or not o.w it simply denied that's lot more strategies that can happend.
    
    @so this "user" that you'r having it gives a retun back lot more information like name,email,token, ....all so we need to take care as that so do res.status and pass it into json
   
 ------------------------------)))---------------------------------------------

 
♦️🙄🙋✍️♦️ -----Heading----- :=>>  login flow for auth??  Identifire:[🥲]

if(!user){
  res.status(400).send("Access denied, you'r not register user")
}
when we'r grabbing the "user"👆 we'r also have grabbing the field user.password
@sideInformation:-> in advance section of mongoose make sure you add "+" sign in case instuctor mongoose not able to send the message while password is coming 
....@above one for 🥰sideInfo

title---=> compare and varify password..........
in genaral ,it return a boolean value weather or not, this is atually one way & let me show you another way this can actually stop some of the spam stuff you'don't want to individually compare email & password you want to simply say may be i want to check one time check as a email & password both at the same time so what can you do instead above one belew one.

  @😶‍🌫️strategies ->instead of storing it into variable we use -> if the user is there and password is match then generate a token & send it back.
  how it is that-> generate token -> pass some info about in payload,optionally you can pass "email"(base on id we can easily grabbed it, not mandatory) but optionally may be some "x" region. 
  Now,we have user & we've got token itself since this token is not save it into DBs itself so i'm go outside the if case👇

*/