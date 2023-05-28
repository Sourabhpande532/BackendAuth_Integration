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



 ----------------)-NEW_HEADING)-----------------

@HEADING:---)----> PROTECTING THE ROUTE  📳mobile Vs 🕸️💻Web(How we can PROTECT the routes give a access of dashboard).

@HINT:Start from login routes to dashboard...

@briefoverview->"What is the use of register & login routes of course protect some of the valuable information so far as we concern that only login user can asses the information"
🎗️design dashboard routes app.get("/dashboard")...

-PROTECTING THE ROUTE 
 👋🎈How we'r gonna do that remember so far we discussed about middleware that's play's huge role in this one.So follow belew @startegies. once after logon token comes into picture

   @🔺🛋️Use middleware(Nothing more that than the fucntion)⤵️

   @🔺🛋️Check for token presence(
     @theory:->complex-picture #Base on what framwork that you'r building/using is base on you'r gonna see the token goes on weather it goes web or mobile. in web it become so easy but in mobile it become little bit tricky now we'r gonna more focus on "web"

     📳mobile Vs 🕸️💻Web => @process of extract the token 
     web --> on the web it's super easy so follow startegies⤵️
     🎗️Just send the token (frontend one)⤵️@How-> how you'r gonna send to fronted we need to concern the information is suppose to be send to fronted that i expect whatever you route trying to access you give me the token where ↙️↙️⬇️ this is where "cookie" comes in ⬇️

     🎗️Send in cookie,httpOnly(fronted can not access this cookie only backend one)⤵️@fix:-> majorily try to fix token into cookie itself that we'saw in express how we can access backend itself res.cookie. 
     ↗️why?httpOnly-> this one only i prefer in the production only backend can access this programmiticaly not frontend if you just set "cookie" only it can be access to anyone.⤵️

     🎗️in headers(another futher down to road you can expect "token" here which is so common information:Go->Postman you'll get to know about headers & Authorization) ⤵️

     🎗️body("token" you can also expect body itself)⤵️
       @sideInfoRegardingFrontedPerspective: while sending request you don't need send "token" but there is usually place or important file in which kind of request take in between where axious is completely able to intercept request & via sending this info just befour that you add a "token" in "header" itself(go postman and pass token via Authorization). give name anyone

   )⤵️

   @🔺🛋️Varify the token (JWT allows us to varify that token weather token expire or it still Authenticated or is it only genrating using your SECRET_KEY only since you only know the Secret & you've only genrating that token only you'r able to decrypt that token & get that information from it -@MAIN-> apart from this once you extract that token & varify it then go to ⤵️)

   @🔺🛋️Extract info from payload(once you extract that information may be at the time + you' just grabbed the "ID" Then again you make a request to DBs itself(grabbing more information & putting that information somewhere it can be into "request" or however you'would like to))⤵️
   @🔺 🛋️NEXT()



 ----------------)-NEW_HEADING)-----------------


(-------@HEADING@--------)📂👋@Identifire[🤑(📂auth.js)]

@Topic-> Writing custom middlewares;
So, In this one we'r going to designed our we own custom middleware How we'r gonna use what's the fuctionality it is? 
@💹🙆‍♂️HINT: PROCESS_of Writing custom middleware Start form here .. Writing code As per the 🀄📍Diagram(Protecting.png) 3rd which is varify the token.

@😏📖Theory-> Couple of thing that you should know how the data is in genral travels there are lot places that it is travel in the "@Headers@" but it can also be traveling by "@Cookies@","@Body@" A/c to applications require whereever form you can grabbed it.

...continue now it's time to speck about 

@🛋️Varify the token as per the 🀄📍Diagram says(Protectingroute.png) or theory says
GO_INSTANTLY_For_Following_Process --> 📂middleware/auth/(From there we need to varify token)

Varification of token can only be done via jsonwebtoken
@ 🛋️ref -> 🖇️https://www.npmjs.com/package/jsonwebtoken(scrool down)
@ 🛋️Hint->  Need to pass three things first is "◀️token","◀️key","◀️callback"(optional)


@🫣📖FurtherMore-> call "auth" methods inside process one. 
@IMP:---> So, how we'r gonna 💹grabbed the "token" it's very important let me tell how the "token" is gonna ✈️🚢travel that give you brief idea :-> just befoure let's talkabout first how the token is gonna travel that it can give a idea how gonna do that.

🎗️first grabbed the 📦token via login
🎗️how it's gonna travel "token" just via "@Headers@"(Go postman in headers section need to mention this one:->▶️ Authorization: Bearer <token>
@ref 🛋️:-> 🖇️https://jwt.io/introduction 

@PracticeOn:-> Postman itself then look for ↙️

Now,we've basic idea/info where to looking for "token" how it do that the most common place that is "Headears" itself let's comes to code part and write it down ↙️

@🙀PROCESS_OF_GRABBING_TOKEN->(@Headears,@Cookie,@body that's why write code)

req.headers('Authorization',) <-- need to pass "Authorization"(you'll get Bearer_ <📦token>) here By the term it's mean what 
you need to get over there is Bearer + space("") + token you don't need all of that Just need 📦"token" need to use little bit @JAVASCRIPT@ Over there just use replace.('Bearer ', "") <- 

replace Bearer with "Nothing" by the term nothing means somebuddys fill this field via fronted/postman while testing.
@🤫KeepNote:The replace() method does not change the original string it just replace it old to new one.

use or condition it comes from cookies,body...

Go🏃‍♀️🏃‍♂️▶️ and check via fronted / postman through 
if you closely take a look we get some info in console so this info is about payload that were we filled while login while creating "token".
take a look on login route you'were passed user_id:"x" email that exactly we got here in terminal.

@😍OVERALL_CONCLUSION
Firstly,we'r hunting for token at a multiple places, + then we check the token weather token present or not we just ensure that if there is not token you'won't be able go further just simply return that value & end it.
in case the token is there just varify and decode information via SECRET_KEY then pass next()


 ----------------)-NEW_HEADING)-----------------


(-------@HEADING@--------)
@IDENTIFIRE[😙(@ABOUT: "Setting Up Secure COOKIES",@HINT:"Send token into token")]
---__---

      @ABOUT🐧:--> Title:Setting Up Secure Cookies

      So far, we'have discussed we can send the token by using "Bearer" auth and all of that But 

      @Now, We onwards Introducing @How we can send token into cookie itself not yet discuss & it's important aspect but ensure that this cookie needs to be pass into browser itself or need to consume our web itself let's suppose you'r sending this cookie into reactNative,or flutter it will be cost/nightmares for you. in those applications it better send token itself and Whenever the request is being made its comes up as a Headears in Authorization.

      Go and work login routes set cookie

      @ABOUT(options)
      Two major thing you'r gonna see into cookie 1st is when the "cookies" are expiring or 2nd one our the cookie can only be readable by the "backend" only
      @🧐Why ? httpOnly:true ? --> it will only allow the cookie to read to those only by a backend server not anybudy script frontend itself.surly we see in postman.
      -@GoThroughPostmant: Do practicle on it.↙️
      -🎗️So,we were be able to send cookie from backend to frontend and if you notice.-
      -🎗️this cookie stored in browser itself.

      @ABOUT:res.status(200).cookie(Neet to pass any "x" name "token"()a/c to 📂middleware/auth.js, passValue(token), options).json()

    🧐Why "token" Name?
       🎗️in middleware I expect cookies is coming in the name of "token" itself if you go and see file that's why 🙆‍♂️calling "token" itself.
    🧐Why ".json" Name at end?
       🎗️ might be some any other applications not be able to handled this cookie so in top of that add "json" response.
       🎗️ might anybudy not be able to send token properly from cookie that's why?

---==---

    @Errorr@ problem actually 
       
      @Now,it's time to 😍access "📍/dashboard" itself this is where that is where the problem kick in(Go Postman)
      Now, we have the cookies consider in "browser itself" hey, we've auth return the auth & look forward the token in cookie itself amd Now 
      😗Given the Fact we'r sending token in "header" and "Authorization" itself 
      @AimAT-> Moto is that just collect the information from cookie itself because we've set it over there.

      Although token is there if you do Now,onwards you'll get error because we'r not pass the info in header & Authorization itself so in order to grabbed that info we'need to take help from 🧐"cookie-parser"
      @AIM: without sending token in header & Authorization we need to do this process via "cookie" itself. 

      @Ref -> 📍🔗https://www.npmjs.com/package/cookie-parser
      @Review🔝↗️ ->  Parse Cookie header and populate req.cookies with an object keyed by the cookie names

      Go,instantly↙️
      @Ref -> 📍📂 middleware/auth/(@entry:console.log(req.cookie);)↙️


      @Continue>>>>......


      why'a'm getting "undefined" Why from here the MAIN source is coming form here that's why & one more A'm trying to extract token form here But why not able to see that
      @sideInformation: So in such case go 📂app.js look for the middleware this again just like we've app.use(express.json()) for one we'r able to read all json data without one you'wont be do that So similary for "cookies" you can't do that read the cookies directly

      so for that we need to install "cookie-parser"

      @Ref -> 📍🔗https://www.npmjs.com/package/cookie-parser

     📂app.js: -->  -🎗️const cookieParser = require("cookie-parser")
                    -🎗️app.use(cookieParser())

    @PerformOpViaPostman:-> still get error But got token in console.log if you check.
    @🚩FoundError:-> on the go -> 🔺TypeError: Cannot read properties of undefined (reading 'replace')

    @🧐WhyIsThat?? => since you'r getting token then why (reading 'replace')"undefined" this where 🙆‍♂️"classic Js "kicks in.
   -🎗️in the auth section you'r notice we mention just go ahead & try grabbed the token from the "Headears" whatever you grabbed just go and run & "replace" on that so we'r instucting whatever you grabbed i didn't say if you grabbed something or if you grabbed "undefined" all of the it's trying to run just this method which is replace the "Bearer" that's why it mess all arround. that't how the error came.

   -🎗️in case chaining up this in sequentional manner surly it'll resolve.
   - As per the requirement we need to grabbed first just here we need token form cookie it should be at top. 
   -🎗️so it not error,it not fucntion,it just classic Js structure first set cookie at top.
   -🎗️& it's convection req.header always at bottom and you can also grabbed it form params.
   -🎗️you can also grabbed token form "params"

   😍😪Now,finaly get the access of dashboard👍✔️.

   😪🫣H.W : How you can expire Cookie Just go and explore & add fuctionality of expire token @hind:->Method:=>AKA aspirations of token and all stuff.
   ------------------------------)))-------------------------------------


*/
