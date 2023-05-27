const jwt = require("jsonwebtoken");
// model is optional, later we discuss

const auth = (req, res, next) => {
  // console.log(req.cookies);
  /* -@IDENTIFIRE[😶‍🌫️(@ContinueFlow:Setting Up Secure Cookies @BRIEF:📂pt.js)] */

  /*🛋️Extract info from payload */
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(403).send("Token is Missing, Access denied");
  }
  // console.log(token);

  /*varify token */
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode);
    req.user = decode; //@PROCESS -> add to user -> {id,email}
    /*👆bring in info from DB*/
    console.log(req.user); //looking exactly what we'were passing.

    /*🔝 may be you'r just passing as a user_id & later on you decide we want to bring in more info into req.user may be emailId may be username & that can be more..so in that case you quickly bring up Your DB up here.& can the user name with email & can add more info into this req.user....for the time being we pass decode(payload info)*/
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = auth;

/*🔝@Identifire[🤑(📂auth.js)](To clear doubt about middleware)GO->tp.js*/
