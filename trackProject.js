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


*/