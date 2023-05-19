/* 
@@--P[1]--@@
♦️🙄🙋✍️♦️ Heading :=>> register a user in auth system;

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



♦️🙄🙋✍️♦️ Heading :=>> Database system in auth system;

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

in this one we'r discussing about some middleware kind of stuff that we previously theory discussed now come to practicle one what the middleware do in the case of "Mongoose" it gives you mainly two two types of middleware some peple they called as lifecylcles "hooks" let's dig up dow of two methods pre and post
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





*/